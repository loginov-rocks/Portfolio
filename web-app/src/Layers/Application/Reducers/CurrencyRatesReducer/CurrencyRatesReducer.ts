import {
  CURRENCY_CHANGED, CurrencyChangedAction, INITIALIZED, InitializedAction, RATES_FAILED, RatesFailedAction,
  RATES_RECEIVED, RatesReceivedAction, RATES_REQUESTED, RatesRequestedAction,
} from 'Layers/Application/Actions/CurrencyRatesActions/CurrencyRatesActions';
import { CurrencyRatesState } from 'Layers/Application/States/CurrencyRatesState/CurrencyRatesState';

const initialState: CurrencyRatesState = {
  availableCurrencies: [],
  currency: null,
  date: null,
  error: null,
  loading: false,
  rates: null,
};

type Action = CurrencyChangedAction | InitializedAction | RatesRequestedAction | RatesReceivedAction
  | RatesFailedAction;

export const CurrencyRatesReducer = (state = initialState, action: Action): CurrencyRatesState => {
  switch (action.type) {
    case CURRENCY_CHANGED:
      return {
        ...state,
        currency: action.payload,
      };

    case INITIALIZED:
      return {
        ...state,
        availableCurrencies: action.payload.availableCurrencies,
        currency: action.payload.baseCurrency,
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
