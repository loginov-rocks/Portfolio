export const AGGREGATE_STOCKS_SYMBOLS_PATTERN = (
  'usersPortfolios/{userId}/portfolios/{portfolioId}/{openClosedPositionsCollection}/{positionId}'
);

// Use the default bucket.
export const ASSETS_LOGOS_BUCKET = undefined;
export const ASSETS_LOGOS_STORAGE_PREFIX = 'assets-logos/';

// Use the default bucket.
export const ASSETS_PALETTES_BUCKET = undefined;
export const ASSETS_PALETTES_STORAGE_PREFIX = 'assets-palettes/';

export const IEX_ASSET_PROVIDER_BASE_URL = 'https://cloud.iexapis.com/v1';

export const GET_OUTDATED_LOGOS_DELAY = 7 * 24 * 60 * 60 * 1000; // a week
export const GET_OUTDATED_QUOTES_DELAY = 30 * 60 * 1000; // 30 minutes

export const STORAGE_BASE_URL = 'https://storage.googleapis.com';

export const UPDATE_ASSETS_FINANCIALS_LIMIT = 10;
export const UPDATE_ASSETS_FINANCIALS_SCHEDULE = 'every 10 minutes';

export const UPDATE_ASSETS_LOGOS_LIMIT = 10;
export const UPDATE_ASSETS_LOGOS_SCHEDULE = 'every 24 hours';
