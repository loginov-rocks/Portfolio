import { createFetchResource, createResetResources } from 'redux-repository/lib/actions';
import { ThunkAction } from 'redux-thunk';

// TODO: Move to Infrastructure layer.
import * as C from 'Constants';
import {
  LogoAction, QuoteAction, STOCKS_LOGOS_RESOURCE_ACTION_NAME, STOCKS_QUOTES_RESOURCE_ACTION_NAME,
} from 'Layers/Application/Actions/StocksActions/StocksActions';
import { IexService } from 'Layers/Business/Services/StocksService/IexService';
import State from 'State';

// TODO: Should be unnecessary.
export interface ResetLogosAction {
  (): void;
}

export interface ResetQuotesAction {
  (): void;
}

export const fetchLogo = (
  symbol: string,
): ThunkAction<void, State, null, LogoAction> => createFetchResource(
  STOCKS_LOGOS_RESOURCE_ACTION_NAME,
  symbol,
  ({ stocks: { logos } }) => logos,
  (dispatchReceived, dispatchFailed) => {
    IexService.getStockLogo(symbol)
      .then((data) => dispatchReceived(data))
      .catch((error) => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.STOCKS_LOGOS_TTL },
);

export const resetLogos = (): ThunkAction<void, State, null, LogoAction> => (
  createResetResources(STOCKS_LOGOS_RESOURCE_ACTION_NAME)
);

export const fetchQuote = (
  symbol: string,
): ThunkAction<void, State, null, QuoteAction> => createFetchResource(
  STOCKS_QUOTES_RESOURCE_ACTION_NAME,
  symbol,
  ({ stocks: { quotes } }) => quotes,
  (dispatchReceived, dispatchFailed) => {
    IexService.getStockQuote(symbol)
      .then((data) => dispatchReceived(data))
      .catch((error) => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.STOCKS_QUOTES_TTL },
);

export const resetQuotes = (): ThunkAction<void, State, null, QuoteAction> => (
  createResetResources(STOCKS_QUOTES_RESOURCE_ACTION_NAME)
);
