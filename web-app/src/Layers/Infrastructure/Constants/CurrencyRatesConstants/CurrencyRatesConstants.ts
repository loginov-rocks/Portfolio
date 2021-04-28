export const CURRENCY_RATES_API_BASE_URL = process.env.RATES_API_URL as string;

export const CURRENCY_RATES_AVAILABLE_CURRENCIES = [
  { key: 'USD', label: 'U.S. Dollar' },
  { key: 'EUR', label: 'Euro' },
  { key: 'JPY', label: 'Japanese Yen' },
  { key: 'GBP', label: 'Pound Sterling' },
  { key: 'RUB', label: 'Russian Ruble' },
];

export const CURRENCY_RATES_BASE_CURRENCY = 'USD';
