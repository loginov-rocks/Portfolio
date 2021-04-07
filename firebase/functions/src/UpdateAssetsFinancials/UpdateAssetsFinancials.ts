import admin from 'firebase-admin';

import { AssetProvider } from 'AssetProvider/AssetProvider';
import { AssetType } from 'AssetProvider/AssetType';

interface Options {
  assetProviders: Map<AssetType, AssetProvider>,
  delay: number;
  firestore: admin.firestore.Firestore;
}

interface ExpiredAssetData {
  assetId: string;
  externalId: string;
  type: AssetType;
}

export class UpdateAssetsFinancials {
  private readonly assetProviders: Map<AssetType, AssetProvider>;

  private readonly delay: number;

  private readonly firestore: admin.firestore.Firestore;

  constructor({ assetProviders, delay, firestore }: Options) {
    this.assetProviders = assetProviders;
    this.delay = delay;
    this.firestore = firestore;
  }

  async onRun(): Promise<null> {
    const assetsCollection = this.firestore.collection('assets');

    // Query expired assets.
    const notExpiredDate = new Date(Date.now() - this.delay);
    const expiredAssetsSnapshot = await assetsCollection.where('financialsUpdatedAt', '<', notExpiredDate).get();
    const expiredAssetsData: ExpiredAssetData[] = [];

    expiredAssetsSnapshot.forEach((snapshot) => {
      expiredAssetsData.push({
        assetId: snapshot.id,
        externalId: snapshot.get('externalId'),
        type: snapshot.get('type'),
      });
    });

    console.log('expiredAssetsData', JSON.stringify(expiredAssetsData));

    // Fetch financials.
    const expiredAssetsDataWithFinancials = await Promise.all(
      expiredAssetsData.map(async ({ assetId, externalId, type }) => {
        const assetProvider = this.assetProviders.get(type);

        if (!assetProvider) {
          console.error(`No asset provider for type "${type}" found`);
          // Skip.
          return null;
        }

        let financials;

        try {
          financials = await assetProvider.getAssetFinancials(externalId);
        } catch (error) {
          console.error(error);
          // Skip.
          return null;
        }

        return {
          assetId,
          externalId,
          financials,
          type,
        };
      }),
    );

    console.log('expiredAssetsDataWithFinancials', JSON.stringify(expiredAssetsDataWithFinancials));

    const batch = this.firestore.batch();

    // Update Firestore.
    expiredAssetsDataWithFinancials.forEach((expiredAssetDataWithFinancials) => {
      if (!expiredAssetDataWithFinancials) {
        // Skip.
        return;
      }

      const assetDocument = assetsCollection.doc(expiredAssetDataWithFinancials.assetId);
      batch.update(assetDocument, {
        financialsUpdatedAt: new Date(),
        price: expiredAssetDataWithFinancials.financials.price,
        title: expiredAssetDataWithFinancials.financials.title,
      });
    });

    await batch.commit();

    return null;
  }
}