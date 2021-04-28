import {
  CURRENCY_RATES_API_BASE_URL, CURRENCY_RATES_AVAILABLE_CURRENCIES, CURRENCY_RATES_BASE_CURRENCY,
} from 'Layers/Infrastructure/Constants/CurrencyRatesConstants/CurrencyRatesConstants';

import { CurrencyRatesApi } from './CurrencyRatesApi';

export const CurrencyRatesService = new CurrencyRatesApi({
  availableCurrencies: CURRENCY_RATES_AVAILABLE_CURRENCIES,
  baseCurrency: CURRENCY_RATES_BASE_CURRENCY,
  baseUrl: CURRENCY_RATES_API_BASE_URL,
});
