import { ThunkAction } from 'redux-thunk';

import {
  homeTabChanged, HomeTabChangedAction, sorterKeyChanged, SorterKeyChangedAction, sorterOrderChanged,
  SorterOrderChangedAction,
} from 'Layers/Application/Actions/HomeActions/HomeActions';
import State from 'State';

// TODO: Should be unnecessary.
export interface ChangeHomeTabAction {
  (tab: 'closed' | 'open' | 'summary'): void;
}

export interface ChangeSorterKeyAction {
  (key: string): void;
}

export interface ChangeSorterOrderAction {
  (order: 'asc' | 'desc'): void;
}

export const changeHomeTab = (
  tab: 'closed' | 'open' | 'summary',
): ThunkAction<void, State, null, HomeTabChangedAction> => (dispatch) => {
  dispatch(homeTabChanged(tab));
};

export const changeSorterKeyCurried = (name: string) => (
  key: string,
): ThunkAction<void, State, null, SorterKeyChangedAction> => (dispatch) => {
  dispatch(sorterKeyChanged(name, key));
};

export const changeSorterOrderCurried = (name: string) => (
  order: 'asc' | 'desc',
): ThunkAction<void, State, null, SorterOrderChangedAction> => (dispatch) => {
  dispatch(sorterOrderChanged(name, order));
};
