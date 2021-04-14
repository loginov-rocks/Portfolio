export interface RatesObject {
  [currency: string]: number;
}

export default interface Rates {
  base: string;
  date: string;
  rates: RatesObject;
} // eslint-disable-line semi
