import { combineReducers } from 'redux';

import app from 'App/reducer';
import currencies from 'Currencies/reducer';
import firebase from 'Firebase/reducer';
import stocks from 'Stocks/reducer';

export default combineReducers({
  app,
  currencies,
  firebase,
  stocks,
});
