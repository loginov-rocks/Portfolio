import axios from 'axios';

import latestFixture from './__fixtures__/latest';
import { CurrencyRatesApi } from './CurrencyRatesApi';

const currencyRatesApi = new CurrencyRatesApi({
  availableCurrencies: [{ key: 'USD', label: 'U.S. Dollar' }],
  baseCurrency: 'USD',
  baseUrl: 'https://example.com',
});

describe('getLatest', () => {
  it('makes request to Rates API to obtain latest rates', () => {
    (axios as jest.Mocked<typeof axios>).get.mockImplementationOnce(() => Promise.resolve({
      data: latestFixture,
    }));

    return currencyRatesApi.getLatest().then((latest) => {
      expect(latest).toStrictEqual(latestFixture);
    });
  });
});
