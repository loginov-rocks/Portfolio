import * as R from '../routes';
import { RouteParamsState } from '../State';

export const NAVIGATION_HAPPENED = 'app/NAVIGATION_HAPPENED';

interface NavigationHappened {
  type: typeof NAVIGATION_HAPPENED;
  payload: {
    params?: RouteParamsState;
    route: R.Route;
  };
}

export type Action = NavigationHappened;
