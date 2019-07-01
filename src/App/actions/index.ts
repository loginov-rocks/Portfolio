import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { navigationHappened } from './creators';
import { State } from '../../reducer';
import { Route } from '../routes';

export const navigate = (
  route: Route,
  params?: { [key: string]: any },
): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(navigationHappened(route, params));
};
