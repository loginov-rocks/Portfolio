/* @flow */

import * as React from 'react';

import AccountsList from '../AccountsList';
import LogoutButton from '../LogoutButton';
import Portfolio from '../Porfolio';

const App = () => (
  <React.Fragment>
    <AccountsList />
    <Portfolio />
    <LogoutButton />
  </React.Fragment>
);

export default App;
