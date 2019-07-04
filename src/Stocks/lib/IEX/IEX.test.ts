import axios from 'axios';

import quoteFixture from './__fixtures__/quote';
import IEX from './IEX';

const instance = new IEX('https://example.com', 'token');

describe('getStockLogo', () => {
  it('makes request to IEX cloud to obtain logo url', () => {
    (axios as jest.Mocked<typeof axios>).get.mockImplementationOnce(() => Promise.resolve({
      data: { url: 'logoUrl' },
    }));

    return instance.getStockLogo('AAPL').then(url => {
      expect(url).toBe('logoUrl');
    });
  });
});

describe('getStockQuote', () => {
  it('makes request to IEX cloud to obtain quote data', () => {
    (axios as jest.Mocked<typeof axios>).get.mockImplementationOnce(() => Promise.resolve({
      data: quoteFixture,
    }));

    return instance.getStockQuote('AAPL').then(quote => {
      expect(quote).toStrictEqual(quoteFixture);
    });
  });
});
