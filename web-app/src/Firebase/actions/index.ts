import { createFetchResource, createResetResources } from 'redux-repository/lib/actions';
import { Action } from 'redux-repository/lib/types';
import { ThunkAction } from 'redux-thunk';

import * as C from 'Constants';
import State from 'State';

import functions from '../lib/Functions';
import VibrantPalette from '../lib/Functions/VibrantPalette';

export interface FetchVibrantPaletteAction {
  (img: string): void;
}

export interface ResetVibrantPalettesAction {
  (): void;
}

export const fetchVibrantPalette = (
  img: string,
): ThunkAction<void, State, null, Action<VibrantPalette, string>> => createFetchResource(
  C.FIREBASE_FUNCTIONS_VIBRANT_PALETTES_RESOURCE_NAME,
  img,
  ({ firebase: { functions: { vibrantPalettes } } }) => vibrantPalettes,
  (dispatchReceived, dispatchFailed) => {
    functions.getVibrantPalette(img)
      .then(data => dispatchReceived(data))
      .catch(error => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.FIREBASE_FUNCTIONS_VIBRANT_PALETTES_TTL },
);

export const resetVibrantPalettes = (): ThunkAction<void, State, null, Action<VibrantPalette, string>> => (
  createResetResources(C.FIREBASE_FUNCTIONS_VIBRANT_PALETTES_RESOURCE_NAME)
);
