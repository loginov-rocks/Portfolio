import { compose } from 'recompose';

import withPositionsArray from 'Portfolio/enhancers/withPositionsArray';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

export default compose(
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
