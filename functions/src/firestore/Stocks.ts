export interface StockDocument {
  // Inherited from IEX API.
  // Quote fields.
  companyName: string;
  close: number | null;
  // TODO: Check if the `previousClose` prop can be null.
  previousClose: number;
  latestPrice: number;
  iexRealtimePrice?: number;
  change: number;
  changePercent: number;
  // Logo fields.
  logo: string;
}

export interface StocksCollection {
  [symbol: string]: StockDocument;
}
