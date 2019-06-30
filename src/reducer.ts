import { firebaseReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import app from 'App/reducer';
import portfolio from 'Portfolio/reducer';
import stocks from 'Stocks/reducer';

export default combineReducers({
  app,
  firebase,
  portfolio,
  stocks,
});
