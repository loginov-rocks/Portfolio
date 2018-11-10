/* @flow */

import * as T from '../../actions/zenMoney/types';
import mergeEntities from './mergeEntities';

const initialState = {
  // Accounts.
  brokerageAccountId: '',

  // Authorization.
  accessToken: '',
  areTokensRequested: false,
  isAuthorized: false,
  refreshToken: '',
  tokensError: '',

  // Diff.
  accounts: [],
  diffError: '',
  diffServerTimestamp: 0,
  instruments: [],
  isDiffRequested: false,
};

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    // Accounts.
    case T.BROKERAGE_ACCOUNT_SET:
      return {
        ...state,
        brokerageAccountId: payload,
      };

    // Authorization.
    case T.ACCESS_TOKEN_SET:
      return {
        ...state,
        isAuthorized: true,
      };

    case T.TOKENS_FAILED:
      return {
        ...state,
        accessToken: '',
        areTokensRequested: false,
        isAuthorized: false,
        refreshToken: '',
        tokensError: payload,
      };

    case T.TOKENS_RECEIVED:
      return {
        ...state,
        accessToken: payload.access_token,
        areTokensRequested: false,
        refreshToken: payload.refresh_token,
        tokensError: '',
      };

    case T.TOKENS_REQUESTED:
      return {
        ...state,
        areTokensRequested: true,
      };

    case T.LOGGED_OUT:
      return initialState;

    // Diff.
    case T.DIFF_FAILED:
      return {
        ...state,
        diffError: payload,
        isDiffRequested: false,
      };

    case T.DIFF_RECEIVED:
      return {
        ...state,
        accounts: mergeEntities(state.accounts, payload.account),
        diffError: '',
        diffServerTimestamp: payload.serverTimestamp,
        instruments: mergeEntities(state.instruments, payload.instrument),
        isDiffRequested: false,
      };

    case T.DIFF_REQUESTED:
      return {
        ...state,
        isDiffRequested: true,
      };

    default:
      return state;
  }
};
