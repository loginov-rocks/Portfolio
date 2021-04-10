export interface ClosedPositionDocument {
  assetId: string;
  amount: number;

  // Open.
  openDate: Date;
  openPrice: number;
  openCommission: number;

  // Closed.
  closedDate: Date;
  closedPrice: number;
  closedCommission: number;
}
