import { Action } from 'redux';
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { isResourceAction, repositoryReducer } from 'redux-repository/lib/reducer';
import { createInitialState, mergeRepositories } from 'redux-repository/lib/repository';
import { Action as ReduxRepositoryAction } from 'redux-repository/lib/types';

import * as C from 'Constants';
import RootState from 'State';

import VibrantPalette from '../lib/Functions/VibrantPalette';
import { FunctionsState as State } from '../State';

const initialState: State = {
  vibrantPalettes: createInitialState(),
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
      vibrantPalettes: mergeRepositories(state.vibrantPalettes, payload.firebase.functions.vibrantPalettes),
    };
  }

  if (isResourceAction(C.FIREBASE_FUNCTIONS_VIBRANT_PALETTES_RESOURCE_NAME,
    action as ReduxRepositoryAction<VibrantPalette, string>)) {
    return {
      ...state,
      vibrantPalettes: repositoryReducer(state.vibrantPalettes,
        action as ReduxRepositoryAction<VibrantPalette, string>),
    };
  }

  return state;
};
