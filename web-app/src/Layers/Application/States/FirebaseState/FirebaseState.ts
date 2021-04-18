import { Repository } from 'redux-repository/lib/interfaces';

import { VibrantPalette } from 'Layers/Business/Services/FirebaseFunctionsService/VibrantPalette';
import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';

export interface AuthState {
  isEmpty: boolean;
  isLoaded: boolean;
  uid?: string;
}

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
      positions?: {
        // `null` used by `react-redux-firebase` when document deleted.
        [positionId: string]: Omit<Position, 'id'> | null;
      };
    };
  };
  functions: FunctionsState;
}
