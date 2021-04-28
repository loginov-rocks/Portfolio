import { ThunkAction } from 'redux-thunk';

import {
  currencyChanged, CurrencyChangedAction, initialized, InitializedAction, ratesFailed, RatesFailedAction, ratesReceived,
  RatesReceivedAction, ratesRequested, RatesRequestedAction,
} from 'Layers/Application/Actions/CurrencyRatesActions/CurrencyRatesActions';
import { CurrencyRatesService } from 'Layers/Business/Services/CurrencyRatesService/CurrencyRatesService';
import State from 'State';

export const changeCurrency = (
  currency: string,
): ThunkAction<void, State, null, CurrencyChangedAction> => (dispatch) => {
  dispatch(currencyChanged(currency));
};

export const fetchRates = (
  //
): ThunkAction<void, State, null, RatesRequestedAction | RatesReceivedAction | RatesFailedAction> => (
  dispatch, getState,
) => {
  const { currencyRates: { date } } = getState();

  if (date === (new Date()).toISOString().slice(0, 10)) {
    // Skip if rates are up to date.
    return;
  }

  dispatch(ratesRequested());

  CurrencyRatesService.getLatest()
    .then((data) => {
      dispatch(ratesReceived(data.rates, data.date));
    })
    .catch((error) => {
      dispatch(ratesFailed(error.toString()));
    });
};

export const initialize = (): ThunkAction<void, State, null, InitializedAction> => (dispatch) => {
  const availableCurrencies = CurrencyRatesService.getAvailableCurrencies();
  const baseCurrency = CurrencyRatesService.getBaseCurrency();

  dispatch(initialized(availableCurrencies, baseCurrency));
};
