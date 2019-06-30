import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'App/components/App';
import createStore from 'App/lib/store/createStore';

import reducer from './reducer';

const container = document.getElementById('root');
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);
