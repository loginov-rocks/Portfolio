/* @flow */

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
    .then(tokens => dispatch({ payload: tokens, type: T.DIFF_RECEIVED }));
};

export const fetchTokens = code => dispatch => {
  dispatch({ type: T.TOKENS_REQUESTED });

  zenMoney.getTokens(code)
    .then(tokens => dispatch({ payload: tokens, type: T.TOKENS_RECEIVED }));
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
