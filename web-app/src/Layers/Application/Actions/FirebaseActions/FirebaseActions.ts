import { Action as ReduxRepositoryAction } from 'redux-repository/lib/types';

import { VibrantPalette } from 'Layers/Business/Services/FirebaseFunctionsService/VibrantPalette';

export type VibrantPaletteAction = ReduxRepositoryAction<VibrantPalette, string>;
