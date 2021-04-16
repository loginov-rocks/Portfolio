export interface RatesObject {
  [currency: string]: number;
}

export interface Rates {
  base: string;
  date: string;
  rates: RatesObject;
}
