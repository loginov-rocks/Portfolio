import { Position } from 'Layers/Business/Services/PortfolioService/Interfaces/Position';

export const POSITION_CREATED = 'portfolio/POSITION_CREATED';
export const POSITION_CLOSED = 'portfolio/POSITION_CLOSED';
export const POSITION_UPDATED = 'portfolio/POSITION_UPDATED';
export const POSITION_DELETED = 'portfolio/POSITION_DELETED';

export interface PositionCreatedAction {
  type: typeof POSITION_CREATED;
  payload: {
    id: string;
    symbol: string;
    amount: number;
    price: number;
    commission: number;
    date: string;
  };
}

export interface PositionClosedAction {
  type: typeof POSITION_CLOSED;
  payload: {
    id: string;
    price: number;
    commission: number;
    date: string;
  };
}

export interface PositionUpdatedAction {
  type: typeof POSITION_UPDATED;
  payload: Position;
}

export interface PositionDeletedAction {
  type: typeof POSITION_DELETED;
  payload: string;
}

export const positionCreated = (
  id: string, symbol: string, amount: number, price: number, commission: number, date: string,
): PositionCreatedAction => ({
  payload: {
    amount, commission, date, id, price, symbol,
  },
  type: POSITION_CREATED,
});

export const positionClosed = (
  id: string, price: number, commission: number, date: string,
): PositionClosedAction => ({
  payload: {
    commission, date, id, price,
  },
  type: POSITION_CLOSED,
});

export const positionUpdated = (position: Position): PositionUpdatedAction => ({
  payload: position,
  type: POSITION_UPDATED,
});

export const positionDeleted = (id: string): PositionDeletedAction => ({
  payload: id,
  type: POSITION_DELETED,
});
