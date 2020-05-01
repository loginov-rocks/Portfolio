import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { getFirebase, ReactReduxFirebaseProviderProps } from 'react-redux-firebase';
import {
  applyMiddleware, compose, createStore, Reducer, Store,
} from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import { persistStore, persistReducer } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import * as C from 'Constants';

export default (reducer: Reducer): {
  persistor: Persistor;
  reactReduxFirebaseProviderProps: ReactReduxFirebaseProviderProps;
  store: Store;
} => {
  firebase.initializeApp({
    apiKey: C.FIREBASE_API_KEY,
    appId: C.FIREBASE_APP_ID,
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
    applyMiddleware(...middleware),
  );

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['app', 'currencies', 'firebase', 'stocks'],
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);

  const reactReduxFirebaseProviderProps = {
    config: {
      useFirestoreForProfile: true,
      userProfile: C.FIRESTORE_USERS_COLLECTION,
    },
    createFirestoreInstance,
    dispatch: store.dispatch,
    firebase,
  };

  return { persistor, reactReduxFirebaseProviderProps, store };
};
