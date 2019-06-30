export const FIREBASE_POSITIONS_PATH = 'positions';
export const FIREBASE_USERS_PATH = 'users';

export const STOCKS_LOGOS_RESOURCE_NAME = 'stocks/logos';
export const STOCKS_LOGOS_TTL = 7 * 24 * 60 * 60 * 1000; // 1 week

export const STOCKS_QUOTES_RESOURCE_NAME = 'stocks/quotes';
export const STOCKS_QUOTES_TTL = 5 * 60 * 1000; // 5 min

export const STOCKS_QUOTES_UPDATER_INTERVAL = 30 * 1000; // 30 sec

export const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} = process.env;
