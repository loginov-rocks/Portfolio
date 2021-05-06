import axios from 'axios';

import quoteFixture from './__fixtures__/quote.json';
import { IexApi } from './IexApi';

const instance = new IexApi({
  baseUrl: 'https://example.com',
  token: 'token',
});

describe('getStockLogo', () => {
  it('makes request to IEX cloud to obtain logo url', () => {
    (axios as jest.Mocked<typeof axios>).get.mockImplementationOnce(() => Promise.resolve({
      data: { url: 'logoUrl' },
    }));

    return instance.getStockLogo('AAPL').then((url) => {
      expect(url).toBe('logoUrl');
    });
  });
});

describe('getStockQuote', () => {
  it('makes request to IEX cloud to obtain quote data', () => {
    (axios as jest.Mocked<typeof axios>).get.mockImplementationOnce(() => Promise.resolve({
      data: quoteFixture,
    }));

    return instance.getStockQuote('AAPL').then((quote) => {
      expect(quote).toStrictEqual(quoteFixture);
    });
  });
});
