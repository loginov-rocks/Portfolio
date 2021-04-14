import { firebaseReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer as firestore } from 'redux-firestore';

import { FirebaseFunctionsReducer } from './FirebaseFunctionsReducer';

export const FirebaseReducer = combineReducers({
  firebase,
  firestore,
  functions: FirebaseFunctionsReducer,
});
