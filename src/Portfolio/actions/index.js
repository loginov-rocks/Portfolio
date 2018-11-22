/* @flow */

import * as C from '../../constants';
import * as T from './types';

export const closePosition = id => dispatch => {
  dispatch({ payload: id, type: T.POSITION_CLOSED });
};

export const openPosition = (
  symbol, price, amount, date,
) => (
  dispatch, getState, getFirebase,
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to open position when unauthorized');
  }

  const position = { amount, date, price, symbol };

  firebase.push(`${C.FIREBASE_POSITIONS_PATH}/${user.uid}`, position)
    .then(() => dispatch({ payload: position, type: T.POSITION_OPENED }));
};
