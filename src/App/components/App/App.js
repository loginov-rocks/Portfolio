/* @flow */

import * as React from 'react';

import Progress from 'Shared/components/Progress';

import Navigation from '../Navigation';
import Guest from '../../views/Guest';

const App = ({ isAuthenticated, progress }) => {
  if (progress) {
    return <Progress />;
  }

  if (!isAuthenticated) {
    return <Guest />;
  }

  return <Navigation />;
};

export default App;
