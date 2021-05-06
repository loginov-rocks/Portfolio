import { Repository } from 'redux-repository/lib/interfaces';

import { VibrantPalette } from 'Layers/Business/Services/FirebaseFunctionsService/Interfaces/VibrantPalette';
import { Position } from 'Layers/Business/Services/PortfolioService/Interfaces/Position';

export const FIRESTORE_DATA_POSITIONS_KEY = 'positions';

export interface AuthState {
  isEmpty: boolean;
  isLoaded: boolean;
  uid?: string;
}

export type PositionData = Position;

export type VibrantPaletteData = VibrantPalette | null;

export type VibrantPalettesState = Repository<VibrantPalette, string>;

export interface FunctionsState {
  vibrantPalettes: VibrantPalettesState;
}

export interface ProfileState {
  avatarUrl?: string;
  displayName?: string;
  email?: string;
  isEmpty: boolean;
  isLoaded: boolean;
}

export interface FirebaseState {
  firebase: {
    auth: AuthState;
    profile: ProfileState;
  };
  firestore: {
    data: {
      [FIRESTORE_DATA_POSITIONS_KEY]?: {
        // `null` used by `react-redux-firebase` when document deleted.
        [positionId: string]: Omit<Position, 'id'> | null;
      };
    };
  };
  functions: FunctionsState;
}
