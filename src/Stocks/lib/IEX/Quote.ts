export default interface Quote {
  symbol: string;
  companyName: string;
  close: number;
  latestPrice: number;
  iexRealtimePrice?: number;
  change: number;
  changePercent: number;
} // eslint-disable-line semi
