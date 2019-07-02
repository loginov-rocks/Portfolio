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
    data: {};
    ordered: {};
  };
} // eslint-disable-line semi
