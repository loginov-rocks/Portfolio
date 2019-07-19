export default interface Quote {
  symbol: string;
  companyName: string;
  // TODO: `close` can be `null` but it's not clear why and what we can do about it.
  close: number;
  latestPrice: number;
  iexRealtimePrice?: number;
  change: number;
  changePercent: number;
} // eslint-disable-line semi
