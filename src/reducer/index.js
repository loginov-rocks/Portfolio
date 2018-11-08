/* @flow */

import * as T from '../actions/types';

const initialState = {
  accessToken: '',
  diff: null,
  isAuthorized: false,
  refreshToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.AUTHORIZATION_TOKEN_SET:
      return {
        ...state,
        isAuthorized: true,
      };

    case T.DIFF_RECEIVED:
      return {
        ...state,
        diff: action.payload,
      };

    case T.LOGGED_OUT:
      return initialState;

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
