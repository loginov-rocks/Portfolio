import { combineReducers } from 'redux';

import app from 'App/reducer';
import firebase from 'Firebase/reducer';
import rates from 'Rates/reducer';
import stocks from 'Stocks/reducer';

export default combineReducers({
  app,
  firebase,
  rates,
  stocks,
});
