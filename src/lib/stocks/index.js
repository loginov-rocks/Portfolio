/* @flow */

import { getResourceById } from 'redux-repository/lib/repository';
import { extractData } from 'redux-repository/lib/resource';

export const calculatePortfolioBalance = (portfolio, stockQuotes) => {
  return portfolio
    .map(({ amount, symbol }) => {
      const quote = extractData(getResourceById(stockQuotes, symbol));

      return (quote && quote.iexRealtimePrice
        ? amount * quote.iexRealtimePrice
        : 0);
    })
    .reduce((a, b) => a + b, 0);
};
