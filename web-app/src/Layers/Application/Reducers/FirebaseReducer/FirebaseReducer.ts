import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import { FirebaseFunctionsReducer } from './FirebaseFunctionsReducer';

export const FirebaseReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  functions: FirebaseFunctionsReducer,
});
