import * as T from './types';

export const positionCreated = (id: string, symbol: string, price: number, amount: number, date: string): T.Action => ({
  payload: {
    amount, date, id, price, symbol,
  },
  type: T.POSITION_CREATED,
});

export const positionDeleted = (id: string): T.Action => ({
  payload: id,
  type: T.POSITION_DELETED,
});
