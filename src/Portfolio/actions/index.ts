import * as firebase from 'firebase';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as C from '../../constants';
import { positionCreated, positionDeleted } from './creators';
import { State } from '../../reducer';

interface GetFirebase {
  (): firebase.app.App;
}

export const createPosition = (
  symbol: string, price: number, amount: number, date: string,
): ThunkAction<void, State, GetFirebase, Action> => (dispatch, getState, getFirebase) => {
  const app = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to create position when unauthorized');
  }

  app.database().ref(`${C.FIREBASE_POSITIONS_PATH}/${user.uid}`).push({
    amount, date, price, symbol,
  })
    .then(({ key }) => {
      if (!key) {
        throw new Error('Reference key is null');
      }

      dispatch(positionCreated(key, symbol, price, amount, date));
    });
};

export const deletePosition = (id: string): ThunkAction<void, State, GetFirebase, Action> => (
  dispatch, getState, getFirebase,
) => {
  const app = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to delete position when unauthorized');
  }

  app.database().ref(`${C.FIREBASE_POSITIONS_PATH}/${user.uid}/${id}`).remove()
    .then(() => {
      dispatch(positionDeleted(id));
    });
};
