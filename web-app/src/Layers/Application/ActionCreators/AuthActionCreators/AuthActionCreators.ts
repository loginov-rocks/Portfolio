import { ThunkAction } from 'redux-thunk';

// TODO: Move to Business layer.
import { getAuthProvider, GetFirebaseExtraArgument } from 'Firebase/lib';
import {
  logoutTriggered, LogoutTriggeredAction, signInTriggered, SignInTriggeredAction,
} from 'Layers/Application/Actions/AuthActions/AuthActions';
import State from 'State';

export const triggerSignIn = (
  provider: string,
): ThunkAction<Promise<void>, State, GetFirebaseExtraArgument, SignInTriggeredAction> => (
  dispatch, getState, getFirebase,
) => {
  dispatch(signInTriggered(provider));

  const firebase = getFirebase();

  return firebase.auth().signInWithRedirect(getAuthProvider(provider));
};

export const triggerLogout = (
  //
): ThunkAction<Promise<void>, State, GetFirebaseExtraArgument, LogoutTriggeredAction> => (
  dispatch, getState, getFirebase,
) => {
  dispatch(logoutTriggered());

  const firebase = getFirebase();

  return firebase.auth().signOut();
};
