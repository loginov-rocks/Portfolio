import { createInitialState, pushResource } from 'redux-repository/lib/repository';
import { createReceived } from 'redux-repository/lib/resource';

import { Quote } from './IEX/IEX';
import { findQuoteBySymbol, getQuotePrice } from './index';

const quote = {
  change: 20,
  changePercent: 10,
  latestPrice: 200,
  symbol: 'AAPL',
};

const quotesRepository = pushResource<Quote, string>(createInitialState(), createReceived('AAPL', quote));

describe('findQuoteBySymbol', () => {
  it('returns quote by symbol', () => {
    expect(findQuoteBySymbol(quotesRepository, 'AAPL')).toBe(quote);
  });

  it('returns null if quote not found', () => {
    expect(findQuoteBySymbol(quotesRepository, 'GOOGL')).toBe(null);
  });
});

describe('getQuotePrice', () => {
  it('returns quote latest price', () => {
    expect(getQuotePrice(quote)).toBe(200);
  });

  it('returns quote IEX realtime price if present', () => {
    expect(getQuotePrice(Object.assign({ iexRealtimePrice: 220 }, quote))).toBe(220);
  });

  it('returns 0 is quote is null', () => {
    expect(getQuotePrice(null)).toBe(0);
  });
});
