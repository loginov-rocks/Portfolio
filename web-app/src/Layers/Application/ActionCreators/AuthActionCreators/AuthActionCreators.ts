import { ThunkAction } from 'redux-thunk';

import {
  logoutTriggered, LogoutTriggeredAction, signInTriggered, SignInTriggeredAction,
} from 'Layers/Application/Actions/AuthActions/AuthActions';
import { GetFirebaseExtraArgument } from 'Layers/Application/Middlewares/FirebaseMiddleware/FirebaseMiddleware';
import { getAuthProvider } from 'Layers/Business/Services/FirebaseService/FirebaseService';
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
