import * as T from '../actions/types';
import * as R from '../routes';

export interface State {
  route: string;
  routeParams: {};
}

const initialState: State = {
  route: R.HOME,
  routeParams: {},
};

export default (state = initialState, action: T.Action) => {
  const { payload } = action;

  switch (action.type) {
    case T.NAVIGATION_HAPPENED:
      return {
        ...state,
        route: payload.route,
        routeParams: payload.params ? payload.params : {},
      };

    default:
      return state;
  }
};
