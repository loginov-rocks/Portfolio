/* @flow */

import * as T from './types';

export const addStock = (symbol, amount) => dispatch => {
  dispatch({ payload: { amount, symbol }, type: T.STOCK_ADDED });
};

export const removeStock = (symbol) => dispatch => {
  dispatch({ payload: symbol, type: T.STOCK_REMOVED });
};
