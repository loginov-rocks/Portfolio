import { Bucket } from '@google-cloud/storage';
import admin from 'firebase-admin';
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';
import Vibrant from 'node-vibrant';

import { Logger } from 'Logger/Logger';

interface Options {
  bucket: Bucket,
  firestore: admin.firestore.Firestore;
  logger: Logger,
  logosStoragePrefix: string;
  storageBaseUrl: string;
  storagePrefix: string;
}

export class UpdateAssetsPalettes {
  private readonly bucket: Bucket;

  private readonly firestore: admin.firestore.Firestore;

  private readonly logger: Logger;

  private readonly logosStoragePrefix: string;

  private readonly storageBaseUrl: string;

  private readonly storagePrefix: string;

  constructor({
    bucket, firestore, logger, logosStoragePrefix, storageBaseUrl, storagePrefix,
  }: Options) {
    this.bucket = bucket;
    this.firestore = firestore;
    this.logger = logger;
    this.logosStoragePrefix = logosStoragePrefix;
    this.storageBaseUrl = storageBaseUrl;
    this.storagePrefix = storagePrefix;
  }

  // TODO: Refactor.
  async onFinalize(object: ObjectMetadata): Promise<void> {
    this.logger.log('object', object);

    const logoFilePath = object.name;

    if (!logoFilePath) {
      this.logger.error(`No file path for object "${object.id}" found`);
      return;
    }

    if (!logoFilePath.startsWith(this.logosStoragePrefix)) {
      return;
    }

    const { contentType } = object;

    if (!contentType) {
      this.logger.error(`No content type for object "${object.id}" found`);
      return;
    }

    if (!contentType.startsWith('image/')) {
      this.logger.error(`Object "${object.id}" not an image`);
      return;
    }

    const assetId = logoFilePath.slice(this.logosStoragePrefix.length);
    const filePath = `${this.storagePrefix}${assetId}.json`;
    const logoUrl = `${this.storageBaseUrl}/${object.bucket}/${logoFilePath}`;
    const paletteUrl = `${this.storageBaseUrl}/${this.bucket.name}/${filePath}`;

    this.logger.log('assetUpdateData', {
      assetId, filePath, logoUrl, paletteUrl,
    });

    // Generate asset palette.
    const palette = await Vibrant.from(logoUrl).getPalette();
    const paletteJson = JSON.stringify(palette);

    // Store asset palette.
    const file = this.bucket.file(filePath);
    await file.save(paletteJson, {
      contentType: 'application/json',
    });
    await file.makePublic();

    // Update asset palette.
    const assetDocument = this.firestore.collection('assets').doc(assetId);
    await assetDocument.update({
      paletteUpdatedAt: new Date(),
      paletteUrl,
    });
  }
}
