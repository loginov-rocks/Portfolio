import { Action } from 'redux';
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { isResourceAction, repositoryReducer } from 'redux-repository/lib/reducer';
import { createInitialState, mergeRepositories } from 'redux-repository/lib/repository';

import {
  VIBRANT_PALETTES_RESOURCE_ACTION_NAME, VibrantPaletteAction,
} from 'Layers/Application/Actions/FirebaseActions/FirebaseActions';
import { FunctionsState as State } from 'Layers/Application/States/FirebaseState/FirebaseState';
import RootState from 'State';

const initialState: State = {
  vibrantPalettes: createInitialState(),
};

export const FirebaseFunctionsReducer = (state: State = initialState, action: Action): State => {
  // Custom state reconciliation.
  if (action.type === REHYDRATE) {
    const { payload } = action as RehydrateAction;

    if (!payload) {
      return state;
    }

    return {
      ...state,
      vibrantPalettes: mergeRepositories(state.vibrantPalettes,
        (payload as RootState).firebase.functions.vibrantPalettes),
    };
  }

  if (isResourceAction(VIBRANT_PALETTES_RESOURCE_ACTION_NAME, action as VibrantPaletteAction)) {
    return {
      ...state,
      vibrantPalettes: repositoryReducer(state.vibrantPalettes, action as VibrantPaletteAction),
    };
  }

  return state;
};
