import { createFetchResource, createResetResources } from 'redux-repository/lib/actions';
import { Action } from 'redux-repository/lib/types';
import { ThunkAction } from 'redux-thunk';

// TODO: Move to Infrastructure layer.
import * as C from 'Constants';
import { IexService } from 'Layers/Business/Services/StocksService/IexService';
import { Quote } from 'Layers/Business/Services/StocksService/IexService/Quote';
import State from 'State';

// TODO: Should be unnecessary.
export interface FetchLogoAction {
  (symbol: string): void;
}

export interface ResetLogosAction {
  (): void;
}

export interface FetchQuoteAction {
  (symbol: string): void;
}

export interface ResetQuotesAction {
  (): void;
}

export const fetchLogo = (
  symbol: string,
): ThunkAction<void, State, null, Action<string, string>> => createFetchResource(
  C.STOCKS_LOGOS_RESOURCE_NAME,
  symbol,
  ({ stocks: { logos } }) => logos,
  (dispatchReceived, dispatchFailed) => {
    IexService.getStockLogo(symbol)
      .then((data) => dispatchReceived(data))
      .catch((error) => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.STOCKS_LOGOS_TTL },
);

export const resetLogos = (): ThunkAction<void, State, null, Action<string, string>> => (
  createResetResources(C.STOCKS_LOGOS_RESOURCE_NAME)
);

export const fetchQuote = (
  symbol: string,
): ThunkAction<void, State, null, Action<Quote, string>> => createFetchResource(
  C.STOCKS_QUOTES_RESOURCE_NAME,
  symbol,
  ({ stocks: { quotes } }) => quotes,
  (dispatchReceived, dispatchFailed) => {
    IexService.getStockQuote(symbol)
      .then((data) => dispatchReceived(data))
      .catch((error) => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.STOCKS_QUOTES_TTL },
);

export const resetQuotes = (): ThunkAction<void, State, null, Action<Quote, string>> => (
  createResetResources(C.STOCKS_QUOTES_RESOURCE_NAME)
);
