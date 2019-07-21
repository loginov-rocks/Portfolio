import { ThunkAction } from 'redux-thunk';

import State from 'State';

import {
  homeTabChanged, navigationHappened, sorterKeyChanged, sorterOrderChanged,
} from './creators';
import * as R from '../routes';
import { RouteParamsState } from '../State';
import { Action } from './types';

export interface ChangeHomeTabAction {
  (tab: 'closed' | 'open' | 'summary'): void;
}

export interface NavigateAction {
  (route: R.Route, params?: RouteParamsState): void;
}

export interface ChangeSorterKeyAction {
  (key: string): void;
}

export interface ChangeSorterOrderAction {
  (order: 'asc' | 'desc'): void;
}

export const changeHomeTab = (
  tab: 'closed' | 'open' | 'summary',
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(homeTabChanged(tab));
};

export const navigate = (
  route: R.Route,
  params?: RouteParamsState,
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(navigationHappened(route, params));
};

export const changeSorterKeyCurried = (name: string) => (
  key: string,
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(sorterKeyChanged(name, key));
};

export const changeSorterOrderCurried = (name: string) => (
  order: 'asc' | 'desc',
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(sorterOrderChanged(name, order));
};
