import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { GetFirebaseExtraArgument } from 'Shared/lib/firebase';

import * as C from '../../constants';
import { positionCreated, positionDeleted } from './creators';
import { State } from '../../reducer';

export const createPosition = (
  symbol: string, price: number, amount: number, date: string,
): ThunkAction<void, State, GetFirebaseExtraArgument, Action> => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to create position when unauthorized');
  }

  firebase.database().ref(`${C.FIREBASE_POSITIONS_PATH}/${user.uid}`).push({
    amount, date, price, symbol,
  })
    .then(({ key }) => {
      if (!key) {
        throw new Error('Reference key is null');
      }

      dispatch(positionCreated(key, symbol, price, amount, date));
    });
};

export const deletePosition = (id: string): ThunkAction<void, State, GetFirebaseExtraArgument, Action> => (
  dispatch, getState, getFirebase,
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to delete position when unauthorized');
  }

  firebase.database().ref(`${C.FIREBASE_POSITIONS_PATH}/${user.uid}/${id}`).remove()
    .then(() => {
      dispatch(positionDeleted(id));
    });
};
