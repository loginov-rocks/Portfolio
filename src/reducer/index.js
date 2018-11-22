/* @flow */

import { firebaseReducer as firebase } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import portfolio from './portfolio';
import stocks from './stocks';
import zenMoney from './zenMoney';

export default combineReducers({
  firebase,
  portfolio,
  stocks,
  zenMoney,
});
