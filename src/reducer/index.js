/* @flow */

import * as T from '../actions/types';

const initialState = {
  accessToken: '',
  isAuthorized: false,
  refreshToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.TOKENS_RECEIVED:
      return {
        ...state,
        accessToken: action.payload.access_token,
        isAuthorized: true,
        refreshToken: action.payload.refresh_token,
      };

    default:
      return state;
  }
};
