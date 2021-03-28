export interface PositionDocument {
  symbol: string;
  amount: number;
  openDate: string;
  openPrice: number;
  openCommission: number;
  closeDate: string | null;
  closePrice: number | null;
  closeCommission: number | null;
}

export interface PositionsCollection {
  [positionId: string]: PositionDocument;
}
