/* @flow */

import * as React from 'react';

import Navigation from '../Navigation';
import Guest from '../../views/Guest';
import Loading from '../../views/Loading';

const App = ({ isAuthenticated, progress }) => {
  if (progress) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Guest />;
  }

  return <Navigation />;
};

export default App;
