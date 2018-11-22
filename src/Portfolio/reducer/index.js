/* @flow */

import * as T from '../actions/types';

const initialState = {
  positions: [],
};

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case T.POSITION_CLOSED:
      return {
        ...state,
        positions: state.positions.slice().filter(({ id }) => (id !== payload)),
      };

    case T.POSITION_OPENED:
      return {
        ...state,
        positions: state.positions.slice().concat([payload]),
      };

    default:
      return state;
  }
};
