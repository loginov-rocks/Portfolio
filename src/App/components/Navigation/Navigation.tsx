import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  AccountCircleOutlined, AddCircleOutlineOutlined, BusinessCenterOutlined, PieChartOutlined,
} from '@material-ui/icons';
import * as React from 'react';

import { NavigateAction } from '../../actions';
import * as R from '../../routes';
import Analytics from '../../views/Analytics';
import ClosePosition from '../../views/ClosePosition';
import CreatePosition from '../../views/CreatePosition';
import Home from '../../views/Home';
import Position from '../../views/Position';
import Profile from '../../views/Profile';
import UpdatePosition from '../../views/UpdatePosition';

export interface Props {
  classes: { [key: string]: string };
  containerRef?: React.RefObject<HTMLDivElement>;
  navigate: NavigateAction;
  route: R.Route;
}

const Navigation: React.FunctionComponent<Props> = ({
  classes, containerRef, navigate, route,
}: Props) => {
  let Component = null;

  switch (route) {
    case R.ANALYTICS:
      Component = Analytics;
      break;

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

    case R.UPDATE_POSITION:
      Component = UpdatePosition;
      break;

    default:
      Component = Home;
      break;
  }

  return (
    <>

      <div className={classes.container} ref={containerRef}>
        <Component />
      </div>

      <BottomNavigation
        className={classes.bottomNavigation}
        onChange={(event, newRoute) => navigate(newRoute)}
        showLabels
        value={route}
      >
        <BottomNavigationAction icon={<AddCircleOutlineOutlined />} label="Open" value={R.CREATE_POSITION} />
        <BottomNavigationAction icon={<BusinessCenterOutlined />} label="Portfolio" value={R.HOME} />
        <BottomNavigationAction icon={<PieChartOutlined />} label="Analytics" value={R.ANALYTICS} />
        <BottomNavigationAction icon={<AccountCircleOutlined />} label="Profile" value={R.PROFILE} />
      </BottomNavigation>

    </>
  );
};

export default Navigation;
