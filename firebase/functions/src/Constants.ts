export const AGGREGATE_STOCKS_SYMBOLS_PATTERN = (
  'usersPortfolios/{userId}/portfolios/{portfolioId}/{openClosedPositionsCollection}/{positionId}'
);

export const IEX_ASSET_PROVIDER_BASE_URL = 'https://cloud.iexapis.com/v1';

export const GET_OUTDATED_LOGOS_DELAY = 7 * 24 * 60 * 60 * 1000; // week
export const GET_OUTDATED_QUOTES_DELAY = 5 * 60 * 1000; // 5 min

// Use the default bucket.
export const LOGOS_BUCKET = undefined;
export const LOGOS_STORAGE_PREFIX = 'logos/';

export const STORAGE_BASE_URL = 'https://storage.googleapis.com';

export const UPDATE_ASSETS_FINANCIALS_LIMIT = 10;
export const UPDATE_ASSETS_FINANCIALS_SCHEDULE = 'every 5 minutes';

export const UPDATE_ASSETS_LOGOS_LIMIT = 10;
export const UPDATE_ASSETS_LOGOS_SCHEDULE = 'every 5 minutes';
