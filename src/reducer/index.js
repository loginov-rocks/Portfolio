/* @flow */

import { combineReducers } from 'redux';

import portfolio from './portfolio';
import stocks from './stocks';
import zenMoney from './zenMoney';

export default combineReducers({
  portfolio,
  stocks,
  zenMoney,
});
