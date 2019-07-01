import { Route } from '../routes';

export const NAVIGATION_HAPPENED = 'app/NAVIGATION_HAPPENED';

interface NavigationHappened {
  type: typeof NAVIGATION_HAPPENED;
  payload: {
    params?: { [key: string]: any };
    route: Route;
  };
}

export type Action = NavigationHappened;
