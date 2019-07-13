import * as T from '../actions/types';
import * as R from '../routes';

import State from '../State';

const initialState: State = {
  homeTab: 'summary',
  route: R.HOME,
  routeParams: {},
  sorters: {},
};

export default (state = initialState, action: T.Action) => {
  switch (action.type) {
    case T.HOME_TAB_CHANGED:
      return {
        ...state,
        homeTab: action.payload,
      };

    case T.NAVIGATION_HAPPENED:
      return {
        ...state,
        route: action.payload.route,
        routeParams: action.payload.params ? action.payload.params : {},
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
