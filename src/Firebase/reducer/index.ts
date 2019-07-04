import { firebaseReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer as firestore } from 'redux-firestore';

export default combineReducers({
  firebase,
  firestore,
});
