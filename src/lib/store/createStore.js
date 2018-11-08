/* @flow */

import { applyMiddleware, compose, createStore } from 'redux';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import thunk from 'redux-thunk';

export default (rootReducer) => {
  const reducer = compose(
    mergePersistedState((initialState, persistedState) => {
      persistedState.isAuthorized = false;

      return persistedState;
    }),
  )(rootReducer);

  const middleware = [thunk];

  const storage = adapter(window.localStorage);

  const composeEnhancers = (typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    persistState(storage, process.env.REACT_APP_REDUX_STORAGE_KEY),
  );

  return createStore(reducer, enhancer);
};
