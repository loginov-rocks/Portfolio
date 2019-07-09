import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { AccountCircleOutlined, AddCircleOutlineOutlined, BusinessCenterOutlined } from '@material-ui/icons';
import * as React from 'react';

import { NavigateAction } from '../../actions';
import * as R from '../../routes';
import ClosePosition from '../../views/ClosePosition';
import CreatePosition from '../../views/CreatePosition';
import Home from '../../views/Home';
import Position from '../../views/Position';
import Profile from '../../views/Profile';

export interface Props {
  classes: { [key: string]: string };
  navigate: NavigateAction;
  route: R.Route;
}

const Navigation: React.FunctionComponent<Props> = ({ classes, navigate, route }: Props) => {
  let Component = null;

  switch (route) {
    case R.CLOSE_POSITION:
      Component = ClosePosition;
      break;

    case R.CREATE_POSITION:
      Component = CreatePosition;
      break;

    case R.POSITION:
      Component = Position;
      break;

    case R.PROFILE:
      Component = Profile;
      break;

    default:
      Component = Home;
      break;
  }

  return (
    <React.Fragment>

      <Component />

      <div className={classes.bottomMock} />

      <BottomNavigation
        className={classes.bottomNavigation}
        onChange={(event, newRoute) => navigate(newRoute)}
        showLabels
        value={route}
      >
        <BottomNavigationAction icon={<AddCircleOutlineOutlined />} label="Open" value={R.CREATE_POSITION} />
        <BottomNavigationAction icon={<BusinessCenterOutlined />} label="Portfolio" value={R.HOME} />
        <BottomNavigationAction icon={<AccountCircleOutlined />} label="Profile" value={R.PROFILE} />
      </BottomNavigation>

    </React.Fragment>
  );
};

export default Navigation;
