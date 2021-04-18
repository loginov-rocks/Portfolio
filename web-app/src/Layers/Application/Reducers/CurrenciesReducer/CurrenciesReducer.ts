// TODO: Consider removing link to the Infrastructure layer as it's the only usage within the Reducers components.
import * as C from 'Constants';
import {
  CURRENCY_CHANGED, CurrencyChangedAction, RATES_FAILED, RatesFailedAction, RATES_RECEIVED, RatesReceivedAction,
  RATES_REQUESTED, RatesRequestedAction,
} from 'Layers/Application/Actions/CurrenciesActions/CurrenciesActions';
import { CurrenciesState } from 'Layers/Application/States/CurrenciesState/CurrenciesState';

const initialState: CurrenciesState = {
  currency: C.DEFAULT_CURRENCY,
  date: null,
  error: null,
  loading: false,
  rates: null,
};

type Action = CurrencyChangedAction | RatesRequestedAction | RatesReceivedAction | RatesFailedAction;

export const CurrenciesReducer = (state: CurrenciesState = initialState, action: Action): CurrenciesState => {
  switch (action.type) {
    case CURRENCY_CHANGED:
      return {
        ...state,
        currency: action.payload,
      };

    case RATES_REQUESTED:
      return {
        ...state,
        date: null,
        error: null,
        loading: true,
        rates: null,
      };

    case RATES_RECEIVED:
      return {
        ...state,
        date: action.payload.date,
        error: null,
        loading: false,
        rates: action.payload.rates,
      };

    case RATES_FAILED:
      return {
        ...state,
        date: null,
        error: action.payload,
        loading: false,
        rates: null,
      };

    default:
      return state;
  }
};
