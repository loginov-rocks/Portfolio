/* @flow */

import * as T from './types';

export const navigate = (route: string, params?: {}) => dispatch => {
  dispatch({
    payload: { route, params },
    type: T.NAVIGATE,
  });
};
