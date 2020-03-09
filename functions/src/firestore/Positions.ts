export interface PositionDocument {
  amount: number;
  closeCommission: number | null;
  closeDate: string | null;
  closePrice: number | null;
  openCommission: number;
  openDate: string;
  openPrice: number;
  symbol: string;
}

export interface PositionsCollection {
  [key: string]: PositionDocument;
}
