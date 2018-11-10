/* @flow */

import { getResourceById } from 'redux-repository/lib/repository';
import { extractData } from 'redux-repository/lib/resource';

export const calculatePortfolioBalance = (portfolio, quotes) => {
  return portfolio
    .map(({ amount, symbol }) => {
      const quote = extractData(getResourceById(quotes, symbol));

      let price = 0;

      if (quote) {
        if (quote.iexRealtimePrice) {
          price = quote.iexRealtimePrice;
        } else if (quote.latestPrice) {
          price = quote.latestPrice;
        }
      }

      return amount * price;
    })
    .reduce((a, b) => a + b, 0);
};
