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
    ordered: {
      users?: {
        id: string;
        positions?: Position[];
      }[];
    };
  };
} // eslint-disable-line semi
