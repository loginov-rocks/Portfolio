/* @flow */

import * as T from '../actions/types';
import * as R from '../routes';

const initialState = {
  route: R.HOME,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.NAVIGATE:
      return {
        ...state,
        route: action.payload,
      };

    default:
      return state;
  }
};
