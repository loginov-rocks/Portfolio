/* @flow */

import uuid from 'uuid/v1';

import * as T from './types';

export const closePosition = id => dispatch => {
  dispatch({ payload: id, type: T.POSITION_CLOSED });
};

export const openPosition = (symbol, price, amount, date) => dispatch => {
  dispatch({
    payload: {
      amount,
      date,
      id: uuid(),
      price,
      symbol,
    },
    type: T.POSITION_OPENED,
  });
};
