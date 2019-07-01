import * as React from 'react';

import { WithProps as Props } from './App.enhancer';
import Navigation from '../Navigation';
import Guest from '../../views/Guest';
import Loading from '../../views/Loading';

const App: React.FunctionComponent<Props> = ({ isAuthenticated, progress }: Props) => {
  if (progress) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Guest />;
  }

  return <Navigation />;
};

export default App;
