/* @flow */

import { compose, type HOC } from 'recompose';

import withPositionsArray from 'Portfolio/enhancers/withPositionsArray';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

const enhancer: HOC<*, *> = compose(
  withNavigationHandlers({
    handleCreatePositionClick: R.CREATE_POSITION,
    handlePositionClick: (props, position) => ({
      params: { position: position.id },
      route: R.POSITION,
    }),
    handleProfileClick: R.PROFILE,
  }),
  withPositionsArray,
);

export default enhancer;
