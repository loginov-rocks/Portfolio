import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import State from 'State';

import { navigationHappened, sorterKeyChanged, sorterOrderChanged } from './creators';
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

export interface ChangeSorterKeyAction {
  (key: string): void;
}

export const changeSorterKeyCurried = (name: string) => (
  key: string,
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(sorterKeyChanged(name, key));
};

export interface ChangeSorterOrderAction {
  (order: 'asc' | 'desc'): void;
}

export const changeSorterOrderCurried = (name: string) => (
  order: 'asc' | 'desc',
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(sorterOrderChanged(name, order));
};
