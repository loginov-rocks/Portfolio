import { firebaseReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer as firestore } from 'redux-firestore';

import app from 'App/reducer';
import portfolio from 'Portfolio/reducer';
import stocks from 'Stocks/reducer';

const reducer = combineReducers({
  app,
  firebase,
  firestore,
  portfolio,
  stocks,
});

export default reducer;

export type State = ReturnType<typeof reducer>;
