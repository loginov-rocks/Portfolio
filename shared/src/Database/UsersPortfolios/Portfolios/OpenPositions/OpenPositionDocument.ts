export interface OpenPositionDocument {
  assetId: string;
  amount: number;

  // Open.
  openDate: Date;
  openPrice: number;
  openCommission: number;
}
