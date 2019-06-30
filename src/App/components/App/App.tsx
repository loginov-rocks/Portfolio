import * as React from 'react';

import Navigation from '../Navigation';
import Guest from '../../views/Guest';
import Loading from '../../views/Loading';

interface Props {
  isAuthenticated: boolean;
  progress: boolean;
}

const App = ({ isAuthenticated, progress }: Props) => {
  if (progress) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Guest />;
  }

  return <Navigation />;
};

export default App;
