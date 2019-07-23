import { ThunkAction } from 'redux-thunk';

import { formatDate } from 'Shared/lib';
import State from 'State';

import {
  currencyChanged, ratesFailed, ratesReceived, ratesRequested,
} from './creators';
import ratesApi from '../lib/RatesApi';
import { Action } from './types';

export interface ChangeCurrencyAction {
  (currency: string): void;
}

export interface FetchRatesAction {
  (): void;
}

export const changeCurrency = (currency: string): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(currencyChanged(currency));
};

export const fetchRates = (): ThunkAction<void, State, null, Action> => (dispatch, getState) => {
  const { currencies: { date } } = getState();

  if (date === formatDate(new Date())) {
    return;
  }

  dispatch(ratesRequested());

  ratesApi.getLatest()
    .then(data => {
      dispatch(ratesReceived(data.rates, data.date));
    })
    .catch(error => {
      dispatch(ratesFailed(error.toString()));
    });
};
