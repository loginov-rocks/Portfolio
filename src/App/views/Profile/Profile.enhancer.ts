import { connect } from 'react-redux';
import { compose } from 'recompose';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

const mapStateToProps = ({ firebase: { profile } }): { profile: {} } => ({ profile });

export default compose(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
  }),
  connect(mapStateToProps),
);
