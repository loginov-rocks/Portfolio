export interface StockDocument {
  // Meta fields.
  _updated: number | null;
  // Quote fields, inherited from IEX API.
  companyName: string;
  close: number | null;
  // TODO: Check if the `previousClose` prop can be null.
  previousClose: number;
  latestPrice: number;
  iexRealtimePrice?: number;
  change: number;
  changePercent: number;
  // Logo fields.
  logo: string | null;
}

export interface StocksCollection {
  [symbol: string]: StockDocument;
}
