import { Position } from '../lib';

export const POSITION_CREATED = 'portfolio/POSITION_CREATED';
export const POSITION_CLOSED = 'portfolio/POSITION_CLOSED';
export const POSITION_UPDATED = 'portfolio/POSITION_UPDATED';
export const POSITION_DELETED = 'portfolio/POSITION_DELETED';

interface PositionCreated {
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

interface PositionClosed {
  type: typeof POSITION_CLOSED;
  payload: {
    id: string;
    price: number;
    commission: number;
    date: string;
  };
}

interface PositionUpdated {
  type: typeof POSITION_UPDATED;
  payload: Position;
}

interface PositionDeleted {
  type: typeof POSITION_DELETED;
  payload: string;
}

export type Action = PositionCreated | PositionClosed | PositionUpdated | PositionDeleted;
