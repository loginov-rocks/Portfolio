import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as C from 'Constants';
import { GetFirebaseExtraArgument } from 'Firebase/lib';
import State from 'State';

import { positionOpened, positionClosed, positionDeleted } from './creators';
import { Position } from '../lib';

export interface OpenPositionAction {
  (symbol: string, amount: number, price: number, commission: number, date: string): Promise<Position>;
}

export const openPosition = (
  symbol: string, amount: number, price: number, commission: number, date: string,
): ThunkAction<Promise<Position>, State, GetFirebaseExtraArgument, Action> => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to open position when unauthorized');
  }

  const positionData = {
    amount,
    closeCommission: null,
    closeDate: null,
    closePrice: null,
    openCommission: commission,
    openDate: date,
    openPrice: price,
    symbol,
  };

  return firebase.firestore()
    .collection(C.FIRESTORE_USERS_COLLECTION)
    .doc(user.uid)
    .collection(C.FIRESTORE_POSITIONS_COLLECTION)
    .add(positionData)
    .then(({ id }) => {
      dispatch(positionOpened(id, symbol, amount, price, commission, date));

      return { ...positionData, id };
    });
};

export interface ClosePositionAction {
  (id: string, price: number, commission: number, date: string): Promise<string>;
}

export const closePosition = (
  id: string, price: number, commission: number, date: string,
): ThunkAction<Promise<string>, State, GetFirebaseExtraArgument, Action> => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to close position when unauthorized');
  }

  return firebase.firestore()
    .collection(C.FIRESTORE_USERS_COLLECTION)
    .doc(user.uid)
    .collection(C.FIRESTORE_POSITIONS_COLLECTION)
    .doc(id)
    .update({
      closeCommission: commission,
      closeDate: date,
      closePrice: price,
    })
    .then(() => {
      dispatch(positionClosed(id, price, commission, date));

      return id;
    });
};

export interface DeletePositionAction {
  (id: string): Promise<string>;
}

export const deletePosition = (
  id: string,
): ThunkAction<Promise<string>, State, GetFirebaseExtraArgument, Action> => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to delete position when unauthorized');
  }

  return firebase.firestore()
    .collection(C.FIRESTORE_USERS_COLLECTION)
    .doc(user.uid)
    .collection(C.FIRESTORE_POSITIONS_COLLECTION)
    .doc(id)
    .delete()
    .then(() => {
      dispatch(positionDeleted(id));

      return id;
    });
};
