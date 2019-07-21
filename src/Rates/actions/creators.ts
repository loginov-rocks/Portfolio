import { Rates } from '../State';
import * as T from './types';

export const ratesRequested = (): T.Action => ({
  type: T.RATES_REQUESTED,
});

export const ratesReceived = (rates: Rates, date: string): T.Action => ({
  payload: { date, rates },
  type: T.RATES_RECEIVED,
});

export const ratesFailed = (error: string): T.Action => ({
  payload: error,
  type: T.RATES_FAILED,
});
