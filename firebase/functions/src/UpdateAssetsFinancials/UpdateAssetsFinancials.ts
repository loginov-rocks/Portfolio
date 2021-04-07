import admin from 'firebase-admin';

import { AssetProvider } from 'AssetProvider/AssetProvider';
import { AssetType } from 'AssetProvider/AssetType';
import { Logger } from 'Logger/Logger';

interface Options {
  assetProviders: Map<AssetType, AssetProvider>,
  delay: number;
  firestore: admin.firestore.Firestore;
  limit: number;
  logger: Logger;
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

  private readonly limit: number;

  private readonly logger: Logger;

  constructor({
    assetProviders, delay, firestore, limit, logger,
  }: Options) {
    this.assetProviders = assetProviders;
    this.delay = delay;
    this.firestore = firestore;
    this.limit = limit;
    this.logger = logger;
  }

  // TODO: Refactor.
  async onRun(): Promise<void> {
    const assetsCollection = this.firestore.collection('assets');

    // Query assets with expired financials.
    const notExpiredDate = new Date(Date.now() - this.delay);
    const expiredAssetsSnapshot = await assetsCollection
      .where('financialsUpdatedAt', '<', notExpiredDate)
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

    this.logger.log('expiredAssetsData', expiredAssetsData);

    // Get assets financials by external IDs.
    const expiredAssetsDataWithFinancials = await Promise.all(
      expiredAssetsData.map(async ({ assetId, externalId, type }) => {
        const assetProvider = this.assetProviders.get(type);

        if (!assetProvider) {
          this.logger.error(`No asset provider for type "${type}" found`);
          // Skip.
          return null;
        }

        let financials;

        try {
          financials = await assetProvider.getAssetFinancials(externalId);
        } catch (error) {
          this.logger.error(error);
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

    this.logger.log('expiredAssetsDataWithFinancials', expiredAssetsDataWithFinancials);

    // Update assets financials.
    const batch = this.firestore.batch();

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
  }
}
