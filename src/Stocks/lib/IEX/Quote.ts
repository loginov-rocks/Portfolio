export default interface Quote {
  symbol: string;
  companyName: string;
  close: number | null;
  // TODO: Check if the `previousClose` prop can be null.
  previousClose: number;
  latestPrice: number;
  iexRealtimePrice?: number;
  change: number;
  changePercent: number;
}
