import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { navigationHappened } from './creators';
import { State } from '../../reducer';

export const navigate = (route: string, params?: {}): ThunkAction<void, State, null, Action> => dispatch => {
  dispatch(navigationHappened(route, params));
};
