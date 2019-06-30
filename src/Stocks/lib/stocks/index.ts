import { getResourceById } from 'redux-repository/lib/repository';
import { extractData } from 'redux-repository/lib/resource';

export const findQuoteBySymbol = (quotesRepository, symbol): {} => (
  extractData(getResourceById(quotesRepository, symbol))
);

export const getQuotePrice = (quote): number => {
  if (quote) {
    if (quote.iexRealtimePrice) {
      return quote.iexRealtimePrice;
    }

    if (quote.latestPrice) {
      return quote.latestPrice;
    }
  }

  return 0;
};
