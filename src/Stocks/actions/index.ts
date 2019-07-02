import { Action } from 'redux';
import { createFetchResource } from 'redux-repository/lib/actions';
import { ThunkAction } from 'redux-thunk';

import * as C from 'Constants';
import State from 'State';

import iex from '../lib/IEX/instance';

export const fetchLogo = (symbol: string): ThunkAction<void, State, null, Action> => createFetchResource(
  C.STOCKS_LOGOS_RESOURCE_NAME,
  symbol,
  ({ stocks: { logos } }) => logos,
  (dispatchReceived, dispatchFailed) => {
    iex.getStockLogo(symbol)
      .then(data => dispatchReceived(data))
      .catch(error => dispatchFailed(error.toString()));
  },
  { ttl: C.STOCKS_LOGOS_TTL },
);

export const fetchQuote = (symbol: string): ThunkAction<void, State, null, Action> => createFetchResource(
  C.STOCKS_QUOTES_RESOURCE_NAME,
  symbol,
  ({ stocks: { quotes } }) => quotes,
  (dispatchReceived, dispatchFailed) => {
    iex.getStockQuote(symbol)
      .then(data => dispatchReceived(data))
      .catch(error => dispatchFailed(error.toString()));
  },
  { ttl: C.STOCKS_QUOTES_TTL },
);
