import * as T from './types';

export const navigate = (route: string, params?: {}) => dispatch => {
  dispatch({
    payload: { params, route },
    type: T.NAVIGATE,
  });
};
