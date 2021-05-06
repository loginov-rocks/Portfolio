import { ThunkAction } from 'redux-thunk';

import {
  positionCreated, PositionCreatedAction, positionClosed, PositionClosedAction, positionDeleted, PositionDeletedAction,
  positionUpdated, PositionUpdatedAction,
} from 'Layers/Application/Actions/PositionsActions/PositionsActions';
import { GetFirebaseExtraArgument } from 'Layers/Application/Middlewares/FirebaseMiddleware/FirebaseMiddleware';
import {
  getPositionDocument, getPositionsCollection,
} from 'Layers/Business/Services/FirestoreService/FirestoreService';
import { Position } from 'Layers/Business/Services/PortfolioService/Interfaces/Position';
import State from 'State';

export const createPosition = (
  symbol: string, amount: number, price: number, commission: number, date: string,
): ThunkAction<Promise<Position>, State, GetFirebaseExtraArgument, PositionCreatedAction> => (
  dispatch, getState, getFirebase,
) => {
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
      dispatch(positionCreated(id, symbol, amount, price, commission, date));

      return { ...positionData, id };
    });
};

export const closePosition = (
  id: string, price: number, commission: number, date: string,
): ThunkAction<Promise<string>, State, GetFirebaseExtraArgument, PositionClosedAction> => (
  dispatch, getState, getFirebase,
) => {
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

export const updatePosition = (
  position: Position,
): ThunkAction<Promise<Position>, State, GetFirebaseExtraArgument, PositionUpdatedAction> => (
  dispatch, getState, getFirebase,
) => {
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

export const deletePosition = (
  id: string,
): ThunkAction<Promise<string>, State, GetFirebaseExtraArgument, PositionDeletedAction> => (
  dispatch, getState, getFirebase,
) => {
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
