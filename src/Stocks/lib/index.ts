import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData } from 'redux-repository/lib/resource';

import { Quote } from './IEX/IEX';

export const findQuoteBySymbol = (quotesRepository: Repository<Quote, string>, symbol: string): Quote | null => (
  extractData(getResourceById(quotesRepository, symbol))
);

export const getQuotePrice = (quote: Quote | null): number => {
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
