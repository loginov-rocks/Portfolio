export interface PositionFormData {
  symbol: string;
  amount: number | '';

  openPrice: number | '';
  openCommission: number | '';
  openDate: string;

  closePrice: number | '';
  closeCommission: number | '';
  closeDate: string;
}
