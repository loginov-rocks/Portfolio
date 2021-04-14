import { createFetchResource, createResetResources } from 'redux-repository/lib/actions';
import { Action } from 'redux-repository/lib/types';
import { ThunkAction } from 'redux-thunk';

// TODO: Move to Infrastructure layer.
import * as C from 'Constants';
// TODO: Move to Business layer.
import functions from 'Firebase/lib/Functions';
// TODO: Move to Business layer.
import VibrantPalette from 'Firebase/lib/Functions/VibrantPalette';
import State from 'State';

// TODO: Should be unnecessary.
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
      .then((data) => dispatchReceived(data))
      .catch((error) => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.FIREBASE_FUNCTIONS_VIBRANT_PALETTES_TTL },
);

export const resetVibrantPalettes = (): ThunkAction<void, State, null, Action<VibrantPalette, string>> => (
  createResetResources(C.FIREBASE_FUNCTIONS_VIBRANT_PALETTES_RESOURCE_NAME)
);
