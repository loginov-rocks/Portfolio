import { Action } from 'redux';
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { isResourceAction, repositoryReducer } from 'redux-repository/lib/reducer';
import { createInitialState, mergeRepositories } from 'redux-repository/lib/repository';

import {
  LogoAction, QuoteAction, STOCKS_LOGOS_RESOURCE_ACTION_NAME, STOCKS_QUOTES_RESOURCE_ACTION_NAME,
} from 'Layers/Application/Actions/StocksActions/StocksActions';
import { StocksState } from 'Layers/Application/States/StocksState/StocksState';
import RootState from 'State';

const initialState: StocksState = {
  logos: createInitialState(),
  quotes: createInitialState(),
};

export const StocksReducer = (state: StocksState = initialState, action: Action): StocksState => {
  // Custom state reconciliation.
  if (action.type === REHYDRATE) {
    const { payload } = action as RehydrateAction;

    if (!payload) {
      return state;
    }

    return {
      ...state,
      logos: mergeRepositories(state.logos, (payload as RootState).stocks.logos),
      quotes: mergeRepositories(state.quotes, (payload as RootState).stocks.quotes),
    };
  }

  if (isResourceAction(STOCKS_LOGOS_RESOURCE_ACTION_NAME, action as LogoAction)) {
    return {
      ...state,
      logos: repositoryReducer(state.logos, action as LogoAction),
    };
  }

  if (isResourceAction(STOCKS_QUOTES_RESOURCE_ACTION_NAME, action as QuoteAction)) {
    return {
      ...state,
      quotes: repositoryReducer(state.quotes, action as QuoteAction),
    };
  }

  return state;
};
