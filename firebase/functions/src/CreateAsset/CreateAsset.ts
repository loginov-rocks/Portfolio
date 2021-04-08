import admin from 'firebase-admin';

import { AssetNotFound } from 'AssetProvider/AssetNotFound';
import { AssetProvider } from 'AssetProvider/AssetProvider';
import { AssetType } from 'AssetProvider/AssetType';
import { BadRequest } from 'Http/BadRequest';
import { HttpRequest } from 'Http/HttpRequest';
import { HttpResponse } from 'Http/HttpResponse';
import { MethodNotAllowed } from 'Http/MethodNotAllowed';
import { NotFound } from 'Http/NotFound';

import { CreateAssetRequest } from './CreateAssetRequest';
import { CreateAssetResponse } from './CreateAssetResponse';

interface Options {
  assetProviders: Map<AssetType, AssetProvider>,
  firestore: admin.firestore.Firestore;
}

export class CreateAsset {
  private readonly assetProviders: Map<AssetType, AssetProvider>;

  private readonly firestore: admin.firestore.Firestore;

  constructor({ assetProviders, firestore }: Options) {
    this.assetProviders = assetProviders;
    this.firestore = firestore;
  }

  // TODO: Refactor.
  async onRequest({ body, method }: HttpRequest<CreateAssetRequest>): Promise<HttpResponse<CreateAssetResponse>> {
    if (method !== 'POST') {
      throw new MethodNotAllowed();
    }

    const { externalId, type } = body;

    if (!externalId) {
      throw new BadRequest('External ID missing');
    }

    if (!type) {
      throw new BadRequest('Type missing');
    }

    const assetsCollection = this.firestore.collection('assets');

    // Query assets with requested external ID and type.
    const assetSnapshot = await assetsCollection
      .where('externalId', '==', externalId)
      .where('type', '==', type)
      .get();

    if (assetSnapshot.size > 0) {
      return {
        body: {
          assetId: assetSnapshot.docs[0].id,
        },
        status: 303,
      };
    }

    const assetProvider = this.assetProviders.get(type);

    if (!assetProvider) {
      throw new BadRequest(`Type "${type}" invalid`);
    }

    // Get asset financials by external ID.
    let financials;

    try {
      financials = await assetProvider.getAssetFinancials(externalId);
    } catch (error) {
      if (error instanceof AssetNotFound) {
        throw new NotFound(`Asset with external ID "${externalId}" and type "${type}" not found`);
      }

      throw error;
    }

    // Store asset.
    const assetDocument = await assetsCollection.add({
      externalId,
      financialsUpdatedAt: new Date(),
      logoUpdatedAt: new Date(0),
      price: financials.price,
      title: financials.title,
      type,
    });

    return {
      body: {
        assetId: assetDocument.id,
      },
      status: 201,
    };
  }
}
