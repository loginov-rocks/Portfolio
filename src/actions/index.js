/* @flow */

import { createFetchResource } from 'redux-repository/lib/actions';

import { STOCK_QUOTE_RESOURCE_NAME, STOCK_QUOTE_TTL } from '../constants';
import iex from '../lib/IEX/instance';
import zenMoney from '../lib/ZenMoney/instance';
import * as T from './types';

export const addStock = (symbol, amount) => dispatch => {
  dispatch({ payload: { amount, symbol }, type: T.STOCK_ADDED });
};

export const fetchDiff = () => (dispatch, getState) => {
  dispatch({ type: T.DIFF_REQUESTED });

  const currentClientTimestamp = Math.round(Date.now() / 1000);
  const serverTimestamp = getState().diffServerTimestamp;

  zenMoney.getDiff(currentClientTimestamp, serverTimestamp)
    .then(tokens => {
      dispatch({ payload: tokens, type: T.DIFF_RECEIVED });
    });
};

export const fetchStockQuote = symbol => createFetchResource(
  STOCK_QUOTE_RESOURCE_NAME,
  symbol,
  ({ stockQuotes }) => stockQuotes,
  (dispatchReceived, dispatchFailed) => {
    iex.getStockQuote(symbol)
      .then(data => dispatchReceived(data))
      .catch(error => dispatchFailed(error.toString()));
  },
  { ttl: STOCK_QUOTE_TTL },
);

export const fetchTokens = code => dispatch => {
  dispatch({ type: T.TOKENS_REQUESTED });

  zenMoney.getTokens(code)
    .then(tokens => {
      dispatch({ payload: tokens, type: T.TOKENS_RECEIVED });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: T.LOGGED_OUT });
};

export const removeStock = (symbol) => dispatch => {
  dispatch({ payload: symbol, type: T.STOCK_REMOVED });
};

export const setAuthorizationToken = token => dispatch => {
  zenMoney.setToken(token);
  dispatch({ type: T.AUTHORIZATION_TOKEN_SET });
};

export const setBrokerageAccount = id => dispatch => {
  dispatch({ payload: id, type: T.BROKERAGE_ACCOUNT_SET });
};
