import * as React from 'react';

import * as R from '../../routes';
import ClosePosition from '../../views/ClosePosition';
import CreatePosition from '../../views/CreatePosition';
import Home from '../../views/Home';
import Position from '../../views/Position';
import Profile from '../../views/Profile';

export interface Props {
  route: R.Route;
}

const Navigation: React.FunctionComponent<Props> = ({ route }: Props) => {
  switch (route) {
    case R.CLOSE_POSITION:
      return <ClosePosition />;

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
