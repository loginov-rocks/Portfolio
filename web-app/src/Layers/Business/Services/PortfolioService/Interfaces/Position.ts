export interface Position {
  id: string;
  symbol: string;
  amount: number;

  openPrice: number;
  openCommission: number;
  openDate: string;

  closePrice: number | null;
  closeCommission: number | null;
  closeDate: string | null;
}
