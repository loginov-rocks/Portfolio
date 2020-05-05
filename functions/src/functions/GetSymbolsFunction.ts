import * as admin from 'firebase-admin';

interface GetSymbolsFunctionConstructor {
  db: admin.firestore.Firestore;
  delay: number;
}

export class GetSymbolsFunction {
  private readonly db: admin.firestore.Firestore;

  private readonly delay: number;

  public constructor({ db, delay }: GetSymbolsFunctionConstructor) {
    this.db = db;
    this.delay = delay;
  }

  // eslint-disable-next-line class-methods-use-this
  public trigger(): Promise<Array<string>> {
    // TODO: Handle null _updated.
    return this.db.collection('stocks').where('_updated', '<', Date.now() - this.delay).get()
      .then(snapshot => {
        if (snapshot.empty) {
          return [];
        }

        const symbols: Array<string> = [];

        snapshot.forEach(stockDoc => {
          symbols.push(stockDoc.id);
        });

        return symbols;
      });
  }
}
