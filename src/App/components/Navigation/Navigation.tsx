import * as React from 'react';

import * as R from '../../routes';
import CreatePosition from '../../views/CreatePosition';
import Home from '../../views/Home';
import Position from '../../views/Position';
import Profile from '../../views/Profile';

interface Props {
  route: string;
}

const Navigation: React.FunctionComponent<Props> = ({ route }: Props) => {
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
