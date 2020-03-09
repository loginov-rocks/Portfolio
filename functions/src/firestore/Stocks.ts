export interface StockDocument {
  // Inherited from IEX API.
  logo: string;
  companyName: string;
  close: number | null;
  // TODO: Check if the `previousClose` prop can be null.
  previousClose: number;
  latestPrice: number;
  iexRealtimePrice?: number;
  change: number;
  changePercent: number;
}

export interface StocksCollection {
  [key: string]: StockDocument;
}
