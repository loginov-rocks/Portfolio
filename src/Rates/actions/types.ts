import { Rates } from '../State';

export const RATES_REQUESTED = 'rates/RATES_REQUESTED';
export const RATES_RECEIVED = 'rates/RATES_RECEIVED';
export const RATES_FAILED = 'rates/RATES_FAILED';

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

export type Action = RatesRequested | RatesReceived | RatesFailed;
