export default interface Quote {
  symbol: string;
  companyName: string;
  latestPrice: number;
  iexRealtimePrice?: number;
  change: number;
  changePercent: number;
} // eslint-disable-line semi
