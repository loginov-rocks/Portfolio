import { ThunkAction } from 'redux-thunk';

import State from 'State';

import { ratesFailed, ratesReceived, ratesRequested } from './creators';
import ratesApi from '../lib/RatesApi';
import { Action } from './types';

export interface FetchRatesAction {
  (): void;
}

export const fetchRates = (): ThunkAction<void, State, null, Action> => dispatch => {
  // TODO: Prevent rates fetching if present and actual.

  dispatch(ratesRequested());

  ratesApi.getLatest()
    .then(data => {
      dispatch(ratesReceived(data.rates, data.date));
    })
    .catch(error => {
      dispatch(ratesFailed(error.toString()));
    });
};
