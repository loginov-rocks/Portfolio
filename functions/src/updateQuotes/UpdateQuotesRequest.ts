export interface UpdateQuotesRequest {
  [index: number]: {
    symbol: string;
    // Quote fields, inherited from IEX API.
    companyName: string;
    close: number | null;
    // TODO: Check if the `previousClose` prop can be null.
    previousClose: number;
    latestPrice: number;
    iexRealtimePrice: number | null;
    change: number;
    changePercent: number;
  };
}
