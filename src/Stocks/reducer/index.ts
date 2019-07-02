import { isResourceAction, repositoryReducer } from 'redux-repository/lib/reducer';
import { createInitialState } from 'redux-repository/lib/repository';

import * as C from 'Constants';

import State from '../State';

const initialState: State = {
  logos: createInitialState(),
  quotes: createInitialState(),
};

export default (state = initialState, action) => {
  if (isResourceAction(C.STOCKS_LOGOS_RESOURCE_NAME, action)) {
    return {
      ...state,
      logos: repositoryReducer(state.logos, action),
    };
  }

  if (isResourceAction(C.STOCKS_QUOTES_RESOURCE_NAME, action)) {
    return {
      ...state,
      quotes: repositoryReducer(state.quotes, action),
    };
  }

  return state;
};
