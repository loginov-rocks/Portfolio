// TODO: Move to Business layer.
import { RatesObject } from 'Currencies/lib/RatesApi/Rates';

export interface CurrenciesState {
  currency: string;
  date: string | null;
  error: string | null;
  loading: boolean;
  rates: RatesObject | null;
}
