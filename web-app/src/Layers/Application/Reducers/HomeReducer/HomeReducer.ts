import {
  HOME_TAB_CHANGED, HomeTabChangedAction, SORTER_KEY_CHANGED, SorterKeyChangedAction, SORTER_ORDER_CHANGED,
  SorterOrderChangedAction,
} from 'Layers/Application/Actions/HomeActions/HomeActions';
import { HomeState } from 'Layers/Application/States/HomeState/HomeState';

const initialState: HomeState = {
  homeTab: 'summary',
  sorters: {},
};

type Action = HomeTabChangedAction | SorterKeyChangedAction | SorterOrderChangedAction;

export const HomeReducer = (state: HomeState = initialState, action: Action): HomeState => {
  switch (action.type) {
    case HOME_TAB_CHANGED:
      return {
        ...state,
        homeTab: action.payload,
      };

    case SORTER_KEY_CHANGED:
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

    case SORTER_ORDER_CHANGED:
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
