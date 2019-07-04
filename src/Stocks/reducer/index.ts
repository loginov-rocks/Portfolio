import { Action } from 'redux';
import { isResourceAction, repositoryReducer } from 'redux-repository/lib/reducer';
import { createInitialState } from 'redux-repository/lib/repository';
import { Action as ReduxRepositoryAction } from 'redux-repository/lib/types';

import * as C from 'Constants';

import { Quote } from '../lib/IEX/IEX';
import State from '../State';

const initialState: State = {
  logos: createInitialState(),
  quotes: createInitialState(),
};

export default (state = initialState, action: Action) => {
  if (isResourceAction(C.STOCKS_LOGOS_RESOURCE_NAME, action as ReduxRepositoryAction<string, string>)) {
    return {
      ...state,
      logos: repositoryReducer(state.logos, action as ReduxRepositoryAction<string, string>),
    };
  }

  if (isResourceAction(C.STOCKS_QUOTES_RESOURCE_NAME, action as ReduxRepositoryAction<Quote, string>)) {
    return {
      ...state,
      quotes: repositoryReducer(state.quotes, action as ReduxRepositoryAction<Quote, string>),
    };
  }

  return state;
};
