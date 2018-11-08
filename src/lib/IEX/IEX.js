/* @flow */

import axios from 'axios';

export default class IEX {
  getStockPrice(symbol) {
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`)
      .then(({ data }) => data);
  }
};
