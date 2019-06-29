import * as React from 'react';

import * as R from '../../routes';
import CreatePosition from '../../views/CreatePosition';
import Home from '../../views/Home';
import Position from '../../views/Position';
import Profile from '../../views/Profile';

const Navigation = ({ route }) => {
  switch (route) {
    case R.CREATE_POSITION:
      return <CreatePosition />;

    case R.POSITION:
      return <Position />;

    case R.PROFILE:
      return <Profile />;

    default:
      return <Home />;
  }
};

export default Navigation;