export const NAVIGATION_HAPPENED = 'app/NAVIGATION_HAPPENED';

interface NavigationHappened {
  type: typeof NAVIGATION_HAPPENED;
  payload: {
    params?: {};
    route: string;
  };
}

export type Action = NavigationHappened;
