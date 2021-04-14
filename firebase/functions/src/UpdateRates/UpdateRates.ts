import { Bucket } from '@google-cloud/storage';

import { Logger } from 'Logger/Logger';
import { RatesProvider } from 'RatesProvider/RatesProvider';

interface Options {
  bucket: Bucket,
  logger: Logger;
  ratesProvider: RatesProvider;
  storagePath: string;
}

export class UpdateRates {
  private readonly bucket: Bucket;

  private readonly logger: Logger;

  private readonly ratesProvider: RatesProvider;

  private readonly storagePath: string;

  constructor({
    bucket, logger, ratesProvider, storagePath,
  }: Options) {
    this.bucket = bucket;
    this.logger = logger;
    this.ratesProvider = ratesProvider;
    this.storagePath = storagePath;
  }

  // TODO: Refactor.
  async onRun(): Promise<void> {
    // Get rates.
    let rates;

    try {
      rates = await this.ratesProvider.getRates();
    } catch (error) {
      this.logger.error(error);
      return;
    }

    this.logger.log('rates', rates);

    // Store rates file.
    const ratesJson = JSON.stringify(rates);

    const file = this.bucket.file(this.storagePath);
    await file.save(ratesJson, {
      contentType: 'application/json',
    });
    await file.makePublic();
  }
}
