/* @flow */

import axios from 'axios';

export default class IEX {
  constructor(url = 'https://api.iextrading.com/1.0') {
    this.url = url;
  }

  getStockLogo(symbol) {
    return axios.get(`${this.url}/stock/${symbol}/logo`)
      .then(({ data }) => data.url);
  }

  getStockQuote(symbol) {
    return axios.get(`${this.url}/stock/${symbol}/quote`)
      .then(({ data }) => data);
  }
};