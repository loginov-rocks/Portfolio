export const POSITION_CREATED = 'portfolio/POSITION_CREATED';
export const POSITION_DELETED = 'portfolio/POSITION_DELETED';

interface PositionCreated {
  type: typeof POSITION_CREATED;
  payload: {
    amount: number;
    date: string;
    id: string;
    price: number;
    symbol: string;
  };
}

interface PositionDeleted {
  type: typeof POSITION_DELETED;
  payload: string;
}

export type Action = PositionCreated | PositionDeleted;
