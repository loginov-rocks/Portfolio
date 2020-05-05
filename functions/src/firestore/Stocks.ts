export interface StockLogoPartialDocument {
  _logoUpdated: number;
  logo: string | null;
}

export interface StockQuotePartialDocument {
  _quoteUpdated: number;
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

export interface StockDocument extends StockLogoPartialDocument, StockQuotePartialDocument {
  //
}

export interface StocksCollection {
  [symbol: string]: StockDocument;
}
