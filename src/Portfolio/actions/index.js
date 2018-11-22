/* @flow */

import * as C from '../../constants';
import * as T from './types';

export const createPosition = (
  symbol, price, amount, date,
) => (
  dispatch, getState, getFirebase,
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to create position when unauthorized');
  }

  const position = { amount, date, price, symbol };

  firebase.push(`${C.FIREBASE_POSITIONS_PATH}/${user.uid}`, position)
    .then(() => dispatch({ payload: position, type: T.POSITION_CREATED }));
};

export const deletePosition = (
  id,
) => (
  dispatch, getState, getFirebase,
) => {
  if (!id) {
    throw new Error('Trying to delete position without ID');
  }

  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to delete position when unauthorized');
  }

  firebase.remove(`${C.FIREBASE_POSITIONS_PATH}/${user.uid}/${id}`)
    .then(() => dispatch({ payload: id, type: T.POSITION_DELETED }));
};
