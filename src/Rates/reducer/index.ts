import * as T from '../actions/types';
import State from '../State';

const initialState: State = {
  date: null,
  error: null,
  loading: false,
  rates: null,
};

export default (state: State = initialState, action: T.Action): State => {
  switch (action.type) {
    case T.RATES_REQUESTED:
      return {
        ...state,
        date: null,
        error: null,
        loading: true,
        rates: null,
      };

    case T.RATES_RECEIVED:
      return {
        ...state,
        date: action.payload.date,
        error: null,
        loading: false,
        rates: action.payload.rates,
      };

    case T.RATES_FAILED:
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
