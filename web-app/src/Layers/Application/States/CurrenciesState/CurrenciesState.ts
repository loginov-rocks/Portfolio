import { RatesObject } from 'Layers/Business/Services/RatesService/Rates';

export interface CurrenciesState {
  currency: string;
  date: string | null;
  error: string | null;
  loading: boolean;
  rates: RatesObject | null;
}
