import { createInitialState, pushResource } from 'redux-repository/lib/repository';
import { createReceived } from 'redux-repository/lib/resource';

import quoteFixture from 'Layers/Business/Services/IexService/__fixtures__/quote.json';
import { Quote } from 'Layers/Business/Services/IexService/Interfaces/Quote';
import { findQuoteBySymbol, getQuotePrice } from './StocksService';

const quotesRepository = pushResource<Quote, string>(createInitialState(), createReceived('AAPL', quoteFixture));

describe('findQuoteBySymbol', () => {
  it('returns quote by symbol', () => {
    expect(findQuoteBySymbol(quotesRepository, 'AAPL')).toStrictEqual(quoteFixture);
  });

  it('returns null if quote not found', () => {
    expect(findQuoteBySymbol(quotesRepository, 'GOOGL')).toBe(null);
  });
});

describe('getQuotePrice', () => {
  it('returns quote latest price', () => {
    expect(getQuotePrice(quoteFixture)).toBe(204.41);
  });

  it('returns quote IEX realtime price if present', () => {
    expect(getQuotePrice({ iexRealtimePrice: 777, ...quoteFixture })).toBe(777);
  });

  it('returns null if quote is null', () => {
    expect(getQuotePrice(null)).toBe(null);
  });
});
