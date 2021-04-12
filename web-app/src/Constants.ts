// Move to Infrastructure layer.

export const AVAILABLE_CURRENCIES = [
  { key: 'USD', label: 'U.S. Dollar' },
  { key: 'EUR', label: 'Euro' },
  { key: 'JPY', label: 'Japanese Yen' },
  { key: 'GBP', label: 'Pound Sterling' },
  { key: 'RUB', label: 'Russian Ruble' },
];
export const DEFAULT_CURRENCY = 'USD';

export const FIREBASE_FUNCTIONS_VIBRANT_PALETTES_RESOURCE_NAME = 'firebaseFunctions/vibrantPalettes';
export const FIREBASE_FUNCTIONS_VIBRANT_PALETTES_TTL = 7 * 24 * 60 * 60 * 1000; // 1 week

export const FIRESTORE_POSITIONS_COLLECTION = 'positions';
export const FIRESTORE_USERS_COLLECTION = 'users';

export const STOCKS_LOGOS_RESOURCE_NAME = 'stocks/logos';
export const STOCKS_LOGOS_TTL = 7 * 24 * 60 * 60 * 1000; // 1 week

export const STOCKS_QUOTES_RESOURCE_NAME = 'stocks/quotes';
export const STOCKS_QUOTES_TTL = 60 * 1000; // 1 min

export const STOCKS_QUOTES_UPDATER_INTERVAL = 30 * 1000; // 30 sec

export const CLOSED_POSITIONS_LIST_SORTER_NAME = 'closedPositionsList';
export const CLOSED_POSITIONS_LIST_SORTER_INITIAL_KEY = 'companyName';
export const CLOSED_POSITIONS_LIST_SORTER_INITIAL_ORDER = 'asc';
export const CLOSED_POSITIONS_LIST_SORTER_KEYS = [
  { key: 'companyName', label: 'Company Name' },
  { key: 'openDate', label: 'Open Date' },
  { key: 'closeDate', label: 'Close Date' },
  { key: 'closePL', label: 'PL' },
  { key: 'closePLPercent', label: 'PL%' },
  { key: 'closePLAnnualPercent', label: 'Annual PL%' },
];

export const OPEN_POSITIONS_LIST_SORTER_NAME = 'openPositionsList';
export const OPEN_POSITIONS_LIST_SORTER_INITIAL_KEY = 'companyName';
export const OPEN_POSITIONS_LIST_SORTER_INITIAL_ORDER = 'asc';
export const OPEN_POSITIONS_LIST_SORTER_KEYS = [
  { key: 'companyName', label: 'Company Name' },
  { key: 'openDate', label: 'Open Date' },
  { key: 'dailyPL', label: 'Daily PL' },
  { key: 'dailyPLPercent', label: 'Daily PL%' },
  { key: 'marketPL', label: 'PL' },
  { key: 'marketPLPercent', label: 'PL%' },
  { key: 'marketPLAnnualPercent', label: 'Annual PL%' },
];

export const OPEN_POSITIONS_SUMMARIES_LIST_SORTER_NAME = 'openPositionsSummariesList';
export const OPEN_POSITIONS_SUMMARIES_LIST_SORTER_INITIAL_KEY = 'companyName';
export const OPEN_POSITIONS_SUMMARIES_LIST_SORTER_INITIAL_ORDER = 'asc';
export const OPEN_POSITIONS_SUMMARIES_LIST_SORTER_KEYS = [
  { key: 'companyName', label: 'Company Name' },
  { key: 'dailyPL', label: 'Daily PL' },
  { key: 'dailyPLPercent', label: 'Daily PL%' },
  { key: 'marketPL', label: 'PL' },
  { key: 'marketPLPercent', label: 'PL%' },
  { key: 'marketSum', label: 'Market Value' },
];

export const STATE_FIREBASE_POSITIONS_KEY = 'positions';

// These variables are taken from ENV, so we can't destructure them.
/* eslint-disable prefer-destructuring */
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
export const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL;
export const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;

export const FIREBASE_FUNCTIONS_URL = process.env.FIREBASE_FUNCTIONS_URL as string;

export const RATES_API_URL = process.env.RATES_API_URL as string;

export const IEX_API_URL = process.env.IEX_API_URL as string;
export const IEX_PUBLISHABLE_TOKEN = process.env.IEX_PUBLISHABLE_TOKEN as string;
/* eslint-enable prefer-destructuring */
