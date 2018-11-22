/* @flow */

import firebase from 'firebase';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as C from '../../../constants';

export default (reducer) => {
  firebase.initializeApp({
    apiKey: C.FIREBASE_API_KEY,
    authDomain: C.FIREBASE_AUTH_DOMAIN,
    databaseURL: C.FIREBASE_DATABASE_URL,
    projectId: C.FIREBASE_PROJECT_ID,
    storageBucket: C.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: C.FIREBASE_MESSAGING_SENDER_ID,
  });

  const middleware = [
    thunk.withExtraArgument(getFirebase),
  ];

  const composeEnhancers = (typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);

  const enhancer = composeEnhancers(
    reactReduxFirebase(firebase, { userProfile: C.FIREBASE_USERS_PATH }),
    applyMiddleware(...middleware),
  );

  return createStore(reducer, enhancer);
};
