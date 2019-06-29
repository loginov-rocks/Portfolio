import * as React from 'react';

import AccountsList from '../AccountsList';
import LogoutButton from '../LogoutButton';

const View = () => (
  <React.Fragment>
    <AccountsList />
    <LogoutButton />
  </React.Fragment>
);

export default View;
