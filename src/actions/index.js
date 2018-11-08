/* @flow */

import zenMoney from '../lib/ZenMoney/instance';
import * as T from './types';

export const fetchDiff = (currentClientTimestamp, serverTimestamp) =>
  dispatch => {
    dispatch({ type: T.DIFF_REQUESTED });

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

export const setAuthorizationToken = token => dispatch => {
  zenMoney.setToken(token);
  dispatch({ type: T.AUTHORIZATION_TOKEN_SET });
};
