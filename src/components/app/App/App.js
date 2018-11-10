/* @flow */

import * as React from 'react';

import Portfolio from '../../portfolio/Porfolio';
import AccountsList from '../../zenMoney/AccountsList';
import LogoutButton from '../../zenMoney/LogoutButton';

const App = () => (
  <React.Fragment>
    <AccountsList />
    <Portfolio />
    <LogoutButton />
  </React.Fragment>
);

export default App;
