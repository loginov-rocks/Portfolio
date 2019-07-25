import { ThunkAction } from 'redux-thunk';

import { GetFirebaseExtraArgument, getPositionDocument, getPositionsCollection } from 'Firebase/lib';
import State from 'State';

import {
  positionOpened, positionClosed, positionDeleted, positionUpdated,
} from './creators';
import { Position } from '../lib';
import { Action } from './types';

export interface OpenPositionAction {
  (symbol: string, amount: number, price: number, commission: number, date: string): Promise<Position>;
}

export interface ClosePositionAction {
  (id: string, price: number, commission: number, date: string): Promise<string>;
}

export interface DeletePositionAction {
  (id: string): Promise<string>;
}

export interface UpdatePositionAction {
  (position: Position): Promise<Position>;
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

  return getPositionsCollection(firebase, user.uid)
    .add(positionData)
    .then(({ id }) => {
      dispatch(positionOpened(id, symbol, amount, price, commission, date));

      return { ...positionData, id };
    });
};

export const closePosition = (
  id: string, price: number, commission: number, date: string,
): ThunkAction<Promise<string>, State, GetFirebaseExtraArgument, Action> => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to close position when unauthorized');
  }

  return getPositionDocument(firebase, user.uid, id)
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

export const deletePosition = (
  id: string,
): ThunkAction<Promise<string>, State, GetFirebaseExtraArgument, Action> => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to delete position when unauthorized');
  }

  return getPositionDocument(firebase, user.uid, id)
    .delete()
    .then(() => {
      dispatch(positionDeleted(id));

      return id;
    });
};

export const updatePosition = (
  position: Position,
): ThunkAction<Promise<Position>, State, GetFirebaseExtraArgument, Action> => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error('Trying to update position when unauthorized');
  }

  const { id, ...positionData } = position;

  return getPositionDocument(firebase, user.uid, id)
    .update(positionData)
    .then(() => {
      dispatch(positionUpdated(position));

      return position;
    });
};
