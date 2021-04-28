import { AvailableCurrency } from 'Layers/Business/Services/CurrencyRatesService/Interfaces/AvailableCurrency';
import {
  CurrencyRatesCollection,
} from 'Layers/Business/Services/CurrencyRatesService/Interfaces/CurrencyRatesCollection';

export const CURRENCY_CHANGED = 'currencyRates/CURRENCY_CHANGED';
export const INITIALIZED = 'currencyRates/INITIALIZED';
export const RATES_REQUESTED = 'currencyRates/RATES_REQUESTED';
export const RATES_RECEIVED = 'currencyRates/RATES_RECEIVED';
export const RATES_FAILED = 'currencyRates/RATES_FAILED';

export interface CurrencyChangedAction {
  type: typeof CURRENCY_CHANGED;
  payload: string;
}

export interface InitializedAction {
  type: typeof INITIALIZED;
  payload: {
    availableCurrencies: AvailableCurrency[];
    baseCurrency: string;
  }
}

export interface RatesRequestedAction {
  type: typeof RATES_REQUESTED;
}

export interface RatesReceivedAction {
  type: typeof RATES_RECEIVED;
  payload: {
    date: string;
    rates: CurrencyRatesCollection;
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

export const initialized = (availableCurrencies: AvailableCurrency[], baseCurrency: string): InitializedAction => ({
  payload: { availableCurrencies, baseCurrency },
  type: INITIALIZED,
});

export const ratesRequested = (): RatesRequestedAction => ({
  type: RATES_REQUESTED,
});

export const ratesReceived = (rates: CurrencyRatesCollection, date: string): RatesReceivedAction => ({
  payload: { date, rates },
  type: RATES_RECEIVED,
});

export const ratesFailed = (error: string): RatesFailedAction => ({
  payload: error,
  type: RATES_FAILED,
});
