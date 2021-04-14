import { Action as ReduxRepositoryAction } from 'redux-repository/lib/types';

// TODO: Move to Business layer.
import VibrantPalette from 'Firebase/lib/Functions/VibrantPalette';

export type VibrantPaletteAction = ReduxRepositoryAction<VibrantPalette, string>;
