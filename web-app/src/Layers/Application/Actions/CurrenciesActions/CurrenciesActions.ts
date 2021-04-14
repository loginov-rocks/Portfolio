// TODO: Move to Business layer.
import { RatesObject } from 'Currencies/lib/RatesApi/Rates';

export const CURRENCY_CHANGED = 'currencies/CURRENCY_CHANGED';
export const RATES_REQUESTED = 'currencies/RATES_REQUESTED';
export const RATES_RECEIVED = 'currencies/RATES_RECEIVED';
export const RATES_FAILED = 'currencies/RATES_FAILED';

export interface CurrencyChangedAction {
  type: typeof CURRENCY_CHANGED;
  payload: string;
}

export interface RatesRequestedAction {
  type: typeof RATES_REQUESTED;
}

export interface RatesReceivedAction {
  type: typeof RATES_RECEIVED;
  payload: {
    date: string;
    rates: RatesObject;
  };
}

export interface RatesFailedAction {
  type: typeof RATES_FAILED;
  payload: string;
}

export const currencyChanged = (currency: string): CurrencyChangedAction => ({
  payload: currency,
  type: CURRENCY_CHANGED,
});

export const ratesRequested = (): RatesRequestedAction => ({
  type: RATES_REQUESTED,
});

export const ratesReceived = (rates: RatesObject, date: string): RatesReceivedAction => ({
  payload: { date, rates },
  type: RATES_RECEIVED,
});

export const ratesFailed = (error: string): RatesFailedAction => ({
  payload: error,
  type: RATES_FAILED,
});
