// TODO: Redux is a part of the Application layer, so should not be in the Business layer.
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData } from 'redux-repository/lib/resource';

import { Quote } from 'Layers/Business/Services/IexService/Interfaces/Quote';

export const findQuoteBySymbol = (quotesRepository: Repository<Quote, string>, symbol: string): Quote | null => (
  extractData(getResourceById(quotesRepository, symbol))
);

export const getQuotePrice = (quote: Quote | null): number | null => {
  if (quote) {
    if (quote.iexRealtimePrice) {
      return quote.iexRealtimePrice;
    }

    return quote.latestPrice;
  }

  return null;
};
