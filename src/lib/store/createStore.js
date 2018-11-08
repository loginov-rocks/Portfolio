/* @flow */

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

export default (reducer) => {
  const composeEnhancers = (typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);

  const middleware = [thunk];

  return createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));
};
