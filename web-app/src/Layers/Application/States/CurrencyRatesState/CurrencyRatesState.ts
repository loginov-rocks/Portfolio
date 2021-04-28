import { AvailableCurrency } from 'Layers/Business/Services/CurrencyRatesService/Interfaces/AvailableCurrency';
import {
  CurrencyRatesCollection,
} from 'Layers/Business/Services/CurrencyRatesService/Interfaces/CurrencyRatesCollection';

export type AvailableCurrenciesState = AvailableCurrency[];

export interface CurrencyRatesState {
  availableCurrencies: AvailableCurrenciesState;
  currency: string | null;
  date: string | null;
  error: string | null;
  loading: boolean;
  rates: CurrencyRatesCollection | null;
}
