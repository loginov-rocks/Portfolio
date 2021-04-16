import { ThunkAction } from 'redux-thunk';

import {
  currencyChanged, CurrencyChangedAction, ratesFailed, RatesFailedAction, ratesReceived, RatesReceivedAction,
  ratesRequested, RatesRequestedAction,
} from 'Layers/Application/Actions/CurrenciesActions/CurrenciesActions';
import { RatesService } from 'Layers/Business/Services/RatesService/RatesService';
// TODO: Move to Infrastructure layer.
import { formatDate } from 'Shared/lib';
import State from 'State';

// TODO: Should be unnecessary.
export interface ChangeCurrencyAction {
  (currency: string): void;
}

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
  const { currencies: { date } } = getState();

  if (date === formatDate(new Date())) {
    return;
  }

  dispatch(ratesRequested());

  RatesService.getLatest()
    .then((data) => {
      dispatch(ratesReceived(data.rates, data.date));
    })
    .catch((error) => {
      dispatch(ratesFailed(error.toString()));
    });
};
