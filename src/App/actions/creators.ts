import { Route } from '../routes';
import * as T from './types';

export const navigationHappened = (
  route: Route,
  params?: { [key: string]: any },
): T.Action => ({
  payload: { params, route },
  type: T.NAVIGATION_HAPPENED,
});
