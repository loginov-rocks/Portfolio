/* @flow */

import * as T from './types';

export const navigate = route => dispatch => {
  dispatch({ payload: route, type: T.NAVIGATE });
};
