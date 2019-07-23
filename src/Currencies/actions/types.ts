import { Rates } from '../State';

export const CURRENCY_CHANGED = 'currencies/CURRENCY_CHANGED';
export const RATES_REQUESTED = 'currencies/RATES_REQUESTED';
export const RATES_RECEIVED = 'currencies/RATES_RECEIVED';
export const RATES_FAILED = 'currencies/RATES_FAILED';

interface CurrencyChanged {
  type: typeof CURRENCY_CHANGED;
  payload: string;
}

interface RatesRequested {
  type: typeof RATES_REQUESTED;
}

interface RatesReceived {
  type: typeof RATES_RECEIVED;
  payload: {
    date: string;
    rates: Rates;
  };
}

interface RatesFailed {
  type: typeof RATES_FAILED;
  payload: string;
}

export type Action = CurrencyChanged | RatesRequested | RatesReceived | RatesFailed;
