import * as T from '../actions/types';
import State from '../State';

const initialState: State = {
  homeTab: 'summary',
  sorters: {},
};

export default (state: State = initialState, action: T.Action): State => {
  switch (action.type) {
    case T.HOME_TAB_CHANGED:
      return {
        ...state,
        homeTab: action.payload,
      };

    case T.SORTER_KEY_CHANGED:
      return {
        ...state,
        sorters: {
          ...state.sorters,
          [action.payload.name]: {
            ...state.sorters[action.payload.name],
            key: action.payload.key,
          },
        },
      };

    case T.SORTER_ORDER_CHANGED:
      return {
        ...state,
        sorters: {
          ...state.sorters,
          [action.payload.name]: {
            ...state.sorters[action.payload.name],
            order: action.payload.order,
          },
        },
      };

    default:
      return state;
  }
};
