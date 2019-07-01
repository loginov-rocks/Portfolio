import * as T from '../actions/types';

const initialState = {
  //
};

export default (state = initialState, action: T.Action) => {
  switch (action.type) {
    case T.POSITION_CREATED:
      return state;

    case T.POSITION_DELETED:
      return state;

    default:
      return state;
  }
};
