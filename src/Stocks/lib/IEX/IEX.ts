import axios from 'axios';

export interface Quote {
  change: number,
  changePercent: number,
  iexRealtimePrice?: number,
  latestPrice: number,
  symbol: string,
}

export default class IEX {
  url: string;

  constructor(url: string = 'https://api.iextrading.com/1.0') {
    this.url = url;
  }

  getStockLogo(symbol: string) {
    return axios.get(`${this.url}/stock/${symbol}/logo`)
      .then(({ data }) => (data.url as string));
  }

  getStockQuote(symbol: string) {
    return axios.get(`${this.url}/stock/${symbol}/quote`)
      .then(({ data }) => (data as Quote));
  }
}
