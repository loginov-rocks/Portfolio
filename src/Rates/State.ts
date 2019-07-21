export interface Rates {
  [currency: string]: number;
}

export default interface State {
  date: string | null;
  error: string | null;
  loading: boolean;
  rates: Rates | null;
}
