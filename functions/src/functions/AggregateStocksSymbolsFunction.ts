import * as admin from 'firebase-admin';

import { PositionDocument } from '../firestore/Positions';
import { StockDocument } from '../firestore/Stocks';

interface AggregateStocksSymbolsFunctionConstructor {
  db: admin.firestore.Firestore;
}

export class AggregateStocksSymbolsFunction {
  private readonly db: admin.firestore.Firestore;

  public static readonly pattern = (
    'usersPortfolios/{userId}/portfolios/{portfolioId}/{openClosedPositionsCollection}/{positionId}'
  );

  public constructor({ db }: AggregateStocksSymbolsFunctionConstructor) {
    this.db = db;
  }

  public trigger(snapshot: admin.firestore.DocumentSnapshot): Promise<void> {
    const { symbol } = snapshot.data() as PositionDocument;
    const stockRef = this.db.collection('stocks').doc(symbol);

    return this.db.runTransaction(transaction => (
      transaction.get(stockRef).then(stockDoc => {
        if (stockDoc.exists) {
          return;
        }

        const stockData: StockDocument = {
          _updated: null,
          change: 0,
          changePercent: 0,
          close: null,
          companyName: '',
          latestPrice: 0,
          logo: null,
          previousClose: 0,
        };

        transaction.set(stockRef, stockData);
      })
    ));
  }
}
