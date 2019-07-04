export const POSITION_OPENED = 'portfolio/POSITION_OPENED';
export const POSITION_CLOSED = 'portfolio/POSITION_CLOSED';
export const POSITION_DELETED = 'portfolio/POSITION_DELETED';

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

export type Action = PositionOpened | PositionClosed | PositionDeleted;
