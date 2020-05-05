import * as admin from 'firebase-admin';

interface GetOutdatedOptions {
  firestore: admin.firestore.Firestore;
  logosDelay: number;
  quotesDelay: number;
}

interface GetOutdatedResult {
  logos: Array<string>;
  quotes: Array<string>;
}

export class GetOutdated {
  private readonly firestore: admin.firestore.Firestore;

  private readonly logosDelay: number;

  private readonly quotesDelay: number;

  public constructor(options: GetOutdatedOptions) {
    this.firestore = options.firestore;
    this.logosDelay = options.logosDelay;
    this.quotesDelay = options.quotesDelay;
  }

  public get(): Promise<GetOutdatedResult> {
    const stocks = this.firestore.collection('stocks');
    const millis = Date.now();
    const logosQuery = stocks.where('_logoUpdated', '<', millis - this.logosDelay).get();
    const quotesQuery = stocks.where('_quoteUpdated', '<', millis - this.quotesDelay).get();

    return Promise.all([logosQuery, quotesQuery])
      .then(([logosSnapshot, quotesSnapshot]) => {
        const logos: Array<string> = [];
        const quotes: Array<string> = [];

        if (!logosSnapshot.empty) {
          logosSnapshot.forEach(stockDoc => {
            logos.push(stockDoc.id);
          });
        }

        if (!quotesSnapshot.empty) {
          quotesSnapshot.forEach(stockDoc => {
            quotes.push(stockDoc.id);
          });
        }

        return { logos, quotes };
      });
  }
}
