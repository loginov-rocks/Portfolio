export interface StockDocument {
  // Meta fields.
  _logoUpdated: number;
  _quoteUpdated: number;
  // Logo fields.
  logo: string | null;
  // Quote fields, inherited from IEX API.
  companyName: string;
  close: number | null;
  // TODO: Check if the `previousClose` prop can be null.
  previousClose: number;
  latestPrice: number;
  iexRealtimePrice: number | null;
  change: number;
  changePercent: number;
}

export interface StocksCollection {
  [symbol: string]: StockDocument;
}
