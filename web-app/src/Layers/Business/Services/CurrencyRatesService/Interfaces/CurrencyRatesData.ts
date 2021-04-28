import { CurrencyRatesCollection } from './CurrencyRatesCollection';

export interface CurrencyRatesData {
  base: string;
  date: string;
  rates: CurrencyRatesCollection;
}
