import { Repository } from 'redux-repository/lib/interfaces';

// TODO: Move to Infrastructure layer.
import * as C from 'Constants';
// TODO: Move to Business layer.
import VibrantPalette from 'Firebase/lib/Functions/VibrantPalette';
import { Position } from 'Portfolio/lib';

export interface AuthState {
  isEmpty: boolean;
  isLoaded: boolean;
  uid?: string;
}

export interface FunctionsState {
  vibrantPalettes: Repository<VibrantPalette, string>;
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
      [C.STATE_FIREBASE_POSITIONS_KEY]?: {
        // `null` used by `react-redux-firebase` when document deleted.
        [positionId: string]: Omit<Position, 'id'> | null;
      };
    };
  };
  functions: FunctionsState;
} // eslint-disable-line semi
