import { Action } from 'redux-repository/lib/types';

import { VibrantPalette } from 'Layers/Business/Services/FirebaseFunctionsService/Interfaces/VibrantPalette';

export const VIBRANT_PALETTES_RESOURCE_ACTION_NAME = 'firebaseFunctions/vibrantPalettes';

export type VibrantPaletteAction = Action<VibrantPalette, string>;
