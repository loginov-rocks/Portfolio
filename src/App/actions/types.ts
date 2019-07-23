import * as R from '../routes';
import { RouteParamsState } from '../State';

export const HOME_TAB_CHANGED = 'app/HOME_TAB_CHANGED';
export const NAVIGATION_HAPPENED = 'app/NAVIGATION_HAPPENED';
export const SORTER_KEY_CHANGED = 'app/SORTER_KEY_CHANGED';
export const SORTER_ORDER_CHANGED = 'app/SORTER_ORDER_CHANGED';

interface HomeTabChanged {
  type: typeof HOME_TAB_CHANGED;
  payload: 'closed' | 'open' | 'summary';
}

interface NavigationHappened {
  type: typeof NAVIGATION_HAPPENED;
  payload: {
    params?: RouteParamsState;
    route: R.Route;
  };
}

interface SorterKeyChanged {
  type: typeof SORTER_KEY_CHANGED;
  payload: {
    name: string;
    key: string;
  };
}

interface SorterOrderChanged {
  type: typeof SORTER_ORDER_CHANGED;
  payload: {
    name: string;
    order: 'asc' | 'desc';
  };
}

export type Action = HomeTabChanged | NavigationHappened | SorterKeyChanged | SorterOrderChanged;
