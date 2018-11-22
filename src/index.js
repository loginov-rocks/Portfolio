/* @flow */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/App';
import createStore from './lib/store/createStore';
import reducer from './reducer';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);

serviceWorker.register();
