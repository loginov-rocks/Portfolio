import { Bucket } from '@google-cloud/storage';
import admin from 'firebase-admin';
import fetch, { Response } from 'node-fetch';

import { AssetProvider } from 'AssetProvider/AssetProvider';
import { AssetType } from 'AssetProvider/AssetType';

interface Options {
  assetProviders: Map<AssetType, AssetProvider>,
  bucket: Bucket,
  delay: number;
  firestore: admin.firestore.Firestore;
  limit: number;
  storageBaseUrl: string;
  storagePrefix: string;
}

interface ExpiredAssetData {
  assetId: string;
  externalId: string;
  type: AssetType;
}

export class UpdateAssetsLogos {
  private readonly assetProviders: Map<AssetType, AssetProvider>;

  private readonly bucket: Bucket;

  private readonly delay: number;

  private readonly firestore: admin.firestore.Firestore;

  private readonly limit: number;

  private readonly storageBaseUrl: string;

  private readonly storagePrefix: string;

  constructor({
    assetProviders, bucket, delay, firestore, limit, storageBaseUrl, storagePrefix,
  }: Options) {
    this.assetProviders = assetProviders;
    this.bucket = bucket;
    this.delay = delay;
    this.firestore = firestore;
    this.limit = limit;
    this.storageBaseUrl = storageBaseUrl;
    this.storagePrefix = storagePrefix;
  }

  // TODO: Refactor.
  async onRun(): Promise<void> {
    const assetsCollection = this.firestore.collection('assets');

    // Query assets with expired logos.
    const notExpiredDate = new Date(Date.now() - this.delay);
    const expiredAssetsSnapshot = await assetsCollection
      .where('logoUpdatedAt', '<', notExpiredDate)
      .limit(this.limit)
      .get();
    const expiredAssetsData: ExpiredAssetData[] = [];

    expiredAssetsSnapshot.forEach((snapshot) => {
      expiredAssetsData.push({
        assetId: snapshot.id,
        externalId: snapshot.get('externalId'),
        type: snapshot.get('type'),
      });
    });

    console.log('expiredAssetsData', JSON.stringify(expiredAssetsData));

    // Get assets logos by external IDs.
    const expiredAssetsDataWithExternalLogos = await Promise.all(
      expiredAssetsData.map(async ({ assetId, externalId, type }) => {
        const assetProvider = this.assetProviders.get(type);

        if (!assetProvider) {
          console.error(`No asset provider for type "${type}" found`);
          // Skip.
          return null;
        }

        let externalLogo;

        try {
          externalLogo = await assetProvider.getAssetLogo(externalId);
        } catch (error) {
          console.error(error);
          // Skip.
          return null;
        }

        return {
          assetId,
          externalId,
          externalLogo,
          type,
        };
      }),
    );

    console.log('expiredAssetsDataWithExternalLogos', JSON.stringify(expiredAssetsDataWithExternalLogos));

    // Store assets logos.
    const expiredAssetsDataWithLogos = await Promise.all(
      expiredAssetsDataWithExternalLogos.map(async (expiredAssetDataWithExternalLogo) => {
        if (!expiredAssetDataWithExternalLogo) {
          // Skip.
          return null;
        }

        const {
          assetId, externalId, externalLogo, type,
        } = expiredAssetDataWithExternalLogo;

        const filePath = `${this.storagePrefix}${assetId}`;
        const file = this.bucket.file(filePath);

        let response: Response;

        try {
          response = await fetch(externalLogo);
        } catch (error) {
          console.error(error);
          // Skip.
          return null;
        }

        const contentType = response.headers.get('content-type');

        await new Promise<void>((resolve, reject) => {
          const writeStream = file.createWriteStream({
            metadata: {
              contentType,
            },
          });
          response.body.pipe(writeStream);
          writeStream.on('error', (error) => {
            reject(error);
          });
          writeStream.on('finish', () => {
            resolve();
          });
        });

        await file.makePublic();

        return {
          assetId,
          externalId,
          logo: `${this.storageBaseUrl}/${this.bucket.name}/${filePath}`,
          type,
        };
      }),
    );

    console.log('expiredAssetsDataWithLogos', JSON.stringify(expiredAssetsDataWithLogos));

    // Update assets logos.
    const batch = this.firestore.batch();

    expiredAssetsDataWithLogos.forEach((expiredAssetDataWithLogo) => {
      if (!expiredAssetDataWithLogo) {
        // Skip.
        return;
      }

      const assetDocument = assetsCollection.doc(expiredAssetDataWithLogo.assetId);
      batch.update(assetDocument, {
        logoUpdatedAt: new Date(),
        logoUrl: expiredAssetDataWithLogo.logo,
      });
    });

    await batch.commit();
  }
}
