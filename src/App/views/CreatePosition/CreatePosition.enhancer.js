/* @flow */

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

export default withNavigationHandlers({
  handleHomeClick: R.HOME,
});
