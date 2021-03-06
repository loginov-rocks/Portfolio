import { Position } from '../lib';
import * as T from './types';

export const positionCreated = (
  id: string,
  symbol: string,
  amount: number,
  price: number,
  commission: number,
  date: string,
): T.Action => ({
  payload: {
    amount, commission, date, id, price, symbol,
  },
  type: T.POSITION_CREATED,
});

export const positionClosed = (
  id: string,
  price: number,
  commission: number,
  date: string,
): T.Action => ({
  payload: {
    commission, date, id, price,
  },
  type: T.POSITION_CLOSED,
});

export const positionUpdated = (position: Position): T.Action => ({
  payload: position,
  type: T.POSITION_UPDATED,
});

export const positionDeleted = (id: string): T.Action => ({
  payload: id,
  type: T.POSITION_DELETED,
});
