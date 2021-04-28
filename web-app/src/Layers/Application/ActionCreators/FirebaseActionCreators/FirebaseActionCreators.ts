import { createFetchResource, createResetResources } from 'redux-repository/lib/actions';
import { ThunkAction } from 'redux-thunk';

// TODO: Move to Infrastructure layer.
import * as C from 'Constants';
import {
  VIBRANT_PALETTES_RESOURCE_ACTION_NAME, VibrantPaletteAction,
} from 'Layers/Application/Actions/FirebaseActions/FirebaseActions';
import { FirebaseFunctionsService } from 'Layers/Business/Services/FirebaseFunctionsService/FirebaseFunctionsService';
import State from 'State';

// TODO: Should be unnecessary.
export interface ResetVibrantPalettesAction {
  (): void;
}

export const fetchVibrantPalette = (
  img: string,
): ThunkAction<void, State, null, VibrantPaletteAction> => createFetchResource(
  VIBRANT_PALETTES_RESOURCE_ACTION_NAME,
  img,
  ({ firebase: { functions: { vibrantPalettes } } }) => vibrantPalettes,
  (dispatchReceived, dispatchFailed) => {
    FirebaseFunctionsService.getVibrantPalette(img)
      .then((data) => dispatchReceived(data))
      .catch((error) => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.FIREBASE_FUNCTIONS_VIBRANT_PALETTES_TTL },
);

export const resetVibrantPalettes = (): ThunkAction<void, State, null, VibrantPaletteAction> => (
  createResetResources(VIBRANT_PALETTES_RESOURCE_ACTION_NAME)
);
