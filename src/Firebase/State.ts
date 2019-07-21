import { Position } from 'Portfolio/lib';

export interface AuthState {
  isEmpty: boolean;
  isLoaded: boolean;
  uid?: string;
}

export interface ProfileState {
  avatarUrl?: string;
  displayName?: string;
  email?: string;
  isEmpty: boolean;
  isLoaded: boolean;
}

export default interface State {
  firebase: {
    auth: AuthState;
    profile: ProfileState;
  };
  firestore: {
    data: {
      users?: {
        [userId: string]: {
          positions?: {
            // `null` used by `react-redux-firebase` when document deleted.
            [positionId: string]: Omit<Position, 'id'> | null;
          };
        };
      };
    };
  };
} // eslint-disable-line semi
