import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import State from 'State';

import { navigationHappened } from './creators';
import { RouteParamsState } from '../State';
import * as R from '../routes';

export interface NavigateAction {
  (route: R.Route, params?: RouteParamsState): void;
}

export const navigate = (
  route: R.Route,
  params?: RouteParamsState,
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(navigationHappened(route, params));
};
