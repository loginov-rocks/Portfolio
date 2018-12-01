/* @flow */

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

export default withNavigationHandlers({
  handleCreatePositionClick: R.CREATE_POSITION,
  handleProfileClick: R.PROFILE,
});
