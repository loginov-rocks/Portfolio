import * as R from '../routes';
import { RouteParamsState } from '../State';
import * as T from './types';

export const navigationHappened = (route: R.Route, params?: RouteParamsState): T.Action => ({
  payload: { params, route },
  type: T.NAVIGATION_HAPPENED,
});
