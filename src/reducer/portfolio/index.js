/* @flow */

import * as T from '../../actions/portfolio/types';

const initialState = {
  portfolio: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.STOCK_ADDED:
      return {
        ...state,
        // TODO: Merge if stock has already been in portfolio.
        portfolio: state.portfolio.concat([action.payload]),
      };

    case T.STOCK_REMOVED:
      return {
        ...state,
        portfolio: state.portfolio.filter(({ symbol }) => (
          symbol !== action.payload
        )),
      };

    default:
      return state;
  }
};
