/* @flow */

import { firebaseReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import portfolio from 'Portfolio/reducer';
import stocks from 'Stocks/reducer';
import zenMoney from 'ZenMoney/reducer';

export default combineReducers({
  firebase,
  portfolio,
  stocks,
  zenMoney,
});
