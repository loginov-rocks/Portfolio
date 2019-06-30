import axios from 'axios';

export interface Quote {
  change: number;
  changePercent: number;
  iexRealtimePrice?: number;
  latestPrice: number;
  symbol: string;
}

export default class IEX {
  protected url: string;

  public constructor(url: string = 'https://api.iextrading.com/1.0') {
    this.url = url;
  }

  public getStockLogo(symbol: string) {
    return axios.get(`${this.url}/stock/${symbol}/logo`)
      .then(({ data }) => (data.url as string));
  }

  public getStockQuote(symbol: string) {
    return axios.get(`${this.url}/stock/${symbol}/quote`)
      .then(({ data }) => (data as Quote));
  }
}
