import * as R from '../routes';
import { RouteParamsState } from '../State';
import * as T from './types';

export const navigationHappened = (route: R.Route, params?: RouteParamsState): T.Action => ({
  payload: { params, route },
  type: T.NAVIGATION_HAPPENED,
});

export const sorterKeyChanged = (name: string, key: string): T.Action => ({
  payload: { key, name },
  type: T.SORTER_KEY_CHANGED,
});

export const sorterOrderChanged = (name: string, order: 'asc' | 'desc'): T.Action => ({
  payload: { name, order },
  type: T.SORTER_ORDER_CHANGED,
});
