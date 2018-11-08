/* @flow */

import { createStore } from 'redux';

export default (reducer) => {
  return createStore(reducer, typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());
};
