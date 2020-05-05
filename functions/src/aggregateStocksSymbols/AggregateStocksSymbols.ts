import * as admin from 'firebase-admin';
import { Change } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

import { PositionDocument } from '../firestore/Positions';
import { StockDocument } from '../firestore/Stocks';

interface AggregateStocksSymbolsOptions {
  firestore: admin.firestore.Firestore;
  pattern: string;
}

export class AggregateStocksSymbols {
  private readonly firestore: admin.firestore.Firestore;

  private readonly pattern: string;

  public constructor(options: AggregateStocksSymbolsOptions) {
    this.firestore = options.firestore;
    this.pattern = options.pattern;
  }

  public getPattern(): string {
    return this.pattern;
  }

  public onCreate(snapshot: DocumentSnapshot): Promise<void> {
    const { symbol } = snapshot.data() as PositionDocument;
    const stockRef = this.firestore.collection('stocks').doc(symbol);

    return this.firestore.runTransaction(transaction => (
      transaction.get(stockRef).then(stockDoc => {
        if (stockDoc.exists) {
          return;
        }

        const stockData: StockDocument = {
          _logoUpdated: 0,
          _quoteUpdated: 0,
          change: 0,
          changePercent: 0,
          close: null,
          companyName: symbol,
          iexRealtimePrice: null,
          latestPrice: 0,
          logo: null,
          previousClose: 0,
        };

        transaction.set(stockRef, stockData);
      })
    ));
  }

  public onUpdate(change: Change<DocumentSnapshot>): Promise<void> {
    return this.onCreate(change.after);
  }
}
