import * as T from './types';

export const navigationHappened = (route: string, params?: {}): T.Action => ({
  payload: { params, route },
  type: T.NAVIGATION_HAPPENED,
});
