import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import {
  applyMiddleware, compose, createStore, Reducer,
} from 'redux';
import { reduxFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';

import * as C from 'Constants';

export default (reducer: Reducer) => {
  firebase.initializeApp({
    apiKey: C.FIREBASE_API_KEY,
    authDomain: C.FIREBASE_AUTH_DOMAIN,
    databaseURL: C.FIREBASE_DATABASE_URL,
    messagingSenderId: C.FIREBASE_MESSAGING_SENDER_ID,
    projectId: C.FIREBASE_PROJECT_ID,
    storageBucket: C.FIREBASE_STORAGE_BUCKET,
  });

  firebase.firestore();

  const middleware = [
    thunk.withExtraArgument(getFirebase),
  ];

  /* eslint-disable @typescript-eslint/no-explicit-any, no-underscore-dangle */
  const composeEnhancers = (typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);
  /* eslint-enable @typescript-eslint/no-explicit-any, no-underscore-dangle */

  const enhancer = composeEnhancers(
    reactReduxFirebase(firebase, { useFirestoreForProfile: true, userProfile: C.FIRESTORE_USERS_COLLECTION }),
    reduxFirestore(firebase),
    applyMiddleware(...middleware),
  );

  return createStore(reducer, enhancer);
};
