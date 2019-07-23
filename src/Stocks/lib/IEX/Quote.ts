export default interface Quote {
  symbol: string;
  companyName: string;
  close: number | null;
  latestPrice: number;
  iexRealtimePrice?: number;
  change: number;
  changePercent: number;
}
