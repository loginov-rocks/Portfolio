import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  AccountCircleOutlined, AddCircleOutlineOutlined, BusinessCenterOutlined, PieChartOutlined,
} from '@material-ui/icons';
import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

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
  currentRoute: R.Route;
}

const routes = [
  // Order matters!
  { component: Analytics, route: R.ANALYTICS },
  { component: Profile, route: R.PROFILE },
  { component: ClosePosition, route: R.CLOSE_POSITION },
  { component: UpdatePosition, route: R.UPDATE_POSITION },
  { component: Position, route: R.POSITION },
  { component: CreatePosition, route: R.CREATE_POSITION },
  { component: Home, route: R.HOME },
];

const navigation = [
  { icon: <AddCircleOutlineOutlined />, label: 'Open', route: R.CREATE_POSITION },
  { icon: <BusinessCenterOutlined />, label: 'Portfolio', route: R.HOME },
  { icon: <PieChartOutlined />, label: 'Analytics', route: R.ANALYTICS },
  { icon: <AccountCircleOutlined />, label: 'Profile', route: R.PROFILE },
];

const Navigation: React.FunctionComponent<Props> = ({
  classes, containerRef, currentRoute,
}: Props) => (
  <>

    <div className={classes.container} ref={containerRef}>
      <Switch>
        {routes.map(({ component, route }) => (
          <Route component={component} key={route} path={route} />
        ))}
      </Switch>
    </div>

    <BottomNavigation
      className={classes.bottomNavigation}
      showLabels
      value={currentRoute}
    >
      {navigation.map(({ icon, label, route }) => (
        <BottomNavigationAction
          component={Link}
          icon={icon}
          key={route}
          label={label}
          to={route}
          value={route}
        />
      ))}
    </BottomNavigation>

  </>
);

export default Navigation;
