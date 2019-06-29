/* @flow */

import axios from 'axios';

export type Quote = {
  change: number,
  changePercent: number,
  iexRealtimePrice?: number,
  latestPrice: number,
  symbol: string,
};

export default class IEX {
  constructor(url: string = 'https://api.iextrading.com/1.0') {
    this.url = url;
  }

  getStockLogo(symbol: string) {
    return axios.get(`${this.url}/stock/${symbol}/logo`)
      .then(({ data }) => (data.url: string));
  }

  getStockQuote(symbol: string) {
    return axios.get(`${this.url}/stock/${symbol}/quote`)
      .then(({ data }) => (data: Quote));
  }
};
