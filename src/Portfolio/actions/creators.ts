import * as T from './types';

export const positionOpened = (
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
  type: T.POSITION_OPENED,
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

export const positionDeleted = (id: string): T.Action => ({
  payload: id,
  type: T.POSITION_DELETED,
});
