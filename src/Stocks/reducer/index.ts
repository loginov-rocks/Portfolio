import { Action } from 'redux';
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { isResourceAction, repositoryReducer } from 'redux-repository/lib/reducer';
import { createInitialState, mergeRepositories } from 'redux-repository/lib/repository';
import { Action as ReduxRepositoryAction } from 'redux-repository/lib/types';

import * as C from 'Constants';
import RootState from 'State';

import Quote from '../lib/IEX/Quote';
import State from '../State';

const initialState: State = {
  logos: createInitialState(),
  quotes: createInitialState(),
};

export default (state: State = initialState, action: Action): State => {
  // Custom state reconciliation.
  if (action.type === REHYDRATE) {
    const { payload } = action as RehydrateAction<RootState>;

    if (!payload) {
      return state;
    }

    return {
      ...state,
      logos: mergeRepositories(state.logos, payload.stocks.logos),
      quotes: mergeRepositories(state.quotes, payload.stocks.quotes),
    };
  }

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
