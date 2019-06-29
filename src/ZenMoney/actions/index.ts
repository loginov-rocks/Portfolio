/* @flow */

import zenMoney from '../lib/ZenMoney/instance';
import * as T from './types';

// Accounts.
export const setBrokerageAccount = id => dispatch => {
  dispatch({ payload: id, type: T.BROKERAGE_ACCOUNT_SET });
};

// Authorization.
export const fetchTokens = code => dispatch => {
  dispatch({ type: T.TOKENS_REQUESTED });

  zenMoney.getTokens(code)
    .then(tokens => {
      dispatch({ payload: tokens, type: T.TOKENS_RECEIVED });
    })
    .catch(error => {
      console.error(error);
      dispatch({ payload: error.toString(), type: T.TOKENS_FAILED });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: T.LOGGED_OUT });
};

export const setAccessToken = token => dispatch => {
  zenMoney.setAccessToken(token);
  dispatch({ type: T.ACCESS_TOKEN_SET });
};

// Diff.
export const fetchDiff = () => (dispatch, getState) => {
  dispatch({ type: T.DIFF_REQUESTED });

  const currentClientTimestamp = Math.round(Date.now() / 1000);
  const serverTimestamp = getState().zenMoney.diffServerTimestamp;

  zenMoney.getDiff(currentClientTimestamp, serverTimestamp)
    .then(tokens => {
      dispatch({ payload: tokens, type: T.DIFF_RECEIVED });
    })
    .catch(error => {
      console.error(error);
      dispatch({ payload: error.toString(), type: T.DIFF_FAILED });
    });
};
