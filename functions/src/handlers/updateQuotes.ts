import * as admin from 'firebase-admin';
import { Request } from 'firebase-functions/lib/providers/https';

import { StockDocument } from '../firestore/Stocks';

export default (db: admin.firestore.Firestore, request: Request): Promise<void> => {
  const {
    change, changePercent, close, companyName, iexRealtimePrice, latestPrice, logo, previousClose, symbol,
  } = request.body;

  const millis = Date.now();

  const data: StockDocument = {
    _logoUpdated: millis,
    _quoteUpdated: millis,
    change,
    changePercent,
    close,
    companyName,
    iexRealtimePrice,
    latestPrice,
    logo,
    previousClose,
  };

  return db.collection('stocks').doc(symbol).set(data)
    .then(() => undefined);
};
