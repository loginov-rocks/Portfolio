/* @flow */

import _ from 'lodash';
import {
  isResourceAction, repositoryReducer,
} from 'redux-repository/lib/reducer';
import { createInitialState } from 'redux-repository/lib/repository';

import * as T from '../actions/types';
import * as C from '../constants';

const initialState = {
  accessToken: '',
  brokerageAccountId: '',
  diff: null,
  diffServerTimestamp: 0,
  isAuthorized: false,
  portfolio: [],
  refreshToken: '',
  stockLogos: createInitialState(),
  stockQuotes: createInitialState(),
};

export default (state = initialState, action) => {
  if (isResourceAction(C.STOCK_LOGO_RESOURCE_NAME, action)) {
    return {
      ...state,
      stockLogos: repositoryReducer(state.stockLogos, action),
    };
  }

  if (isResourceAction(C.STOCK_QUOTE_RESOURCE_NAME, action)) {
    return {
      ...state,
      stockQuotes: repositoryReducer(state.stockQuotes, action),
    };
  }

  switch (action.type) {
    case T.AUTHORIZATION_TOKEN_SET:
      return {
        ...state,
        isAuthorized: true,
      };

    case T.BROKERAGE_ACCOUNT_SET:
      return {
        ...state,
        brokerageAccountId: action.payload,
      };

    case T.DIFF_RECEIVED:
      return {
        ...state,
        // TODO: Keep only needed data.
        diff: _.assign({}, state.diff, action.payload),
        diffServerTimestamp: action.payload.serverTimestamp,
      };

    case T.LOGGED_OUT:
      return initialState;

    case T.STOCK_ADDED:
      return {
        ...state,
        portfolio: state.portfolio.concat([action.payload]),
      };

    case T.STOCK_REMOVED:
      return {
        ...state,
        portfolio: state.portfolio.filter(({ symbol }) => (
          symbol !== action.payload
        )),
      };

    case T.TOKENS_RECEIVED:
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      };

    default:
      return state;
  }
};
