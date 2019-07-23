import { Position } from '../lib';

export const POSITION_OPENED = 'portfolio/POSITION_OPENED';
export const POSITION_CLOSED = 'portfolio/POSITION_CLOSED';
export const POSITION_DELETED = 'portfolio/POSITION_DELETED';
export const POSITION_UPDATED = 'portfolio/POSITION_UPDATED';

interface PositionOpened {
  type: typeof POSITION_OPENED;
  payload: {
    id: string;
    symbol: string;
    amount: number;
    price: number;
    commission: number;
    date: string;
  };
}

interface PositionClosed {
  type: typeof POSITION_CLOSED;
  payload: {
    id: string;
    price: number;
    commission: number;
    date: string;
  };
}

interface PositionDeleted {
  type: typeof POSITION_DELETED;
  payload: string;
}

interface PositionUpdated {
  type: typeof POSITION_UPDATED;
  payload: Position;
}

export type Action = PositionOpened | PositionClosed | PositionDeleted | PositionUpdated;
