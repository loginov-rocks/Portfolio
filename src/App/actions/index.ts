import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import State from 'State';

import { navigationHappened } from './creators';
import { Route } from '../routes';

export const navigate = (
  route: Route,
  params?: { [key: string]: any },
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(navigationHappened(route, params));
};
