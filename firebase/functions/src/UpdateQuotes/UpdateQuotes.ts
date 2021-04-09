import { StockQuotePartialDocument } from '@loginov-rocks/portfolio-shared';
import admin from 'firebase-admin';

import { UpdateQuotesRequest } from './UpdateQuotesRequest';

interface UpdateQuotesOptions {
  firestore: admin.firestore.Firestore;
}

export class UpdateQuotes {
  private readonly firestore: admin.firestore.Firestore;

  public constructor(options: UpdateQuotesOptions) {
    this.firestore = options.firestore;
  }

  public patch(request: UpdateQuotesRequest): Promise<void> {
    const batch = this.firestore.batch();

    Object.values(request).forEach((quote) => {
      const millis = Date.now();
      const {
        change, changePercent, close, companyName, iexRealtimePrice, latestPrice, previousClose, symbol,
      } = quote;

      const data: StockQuotePartialDocument = {
        _quoteUpdated: millis,
        change,
        changePercent,
        close,
        companyName,
        iexRealtimePrice,
        latestPrice,
        previousClose,
      };

      const stockRef = this.firestore.collection('stocks').doc(symbol);
      batch.update(stockRef, data);
    });

    return batch.commit().then(() => undefined);
  }
}
