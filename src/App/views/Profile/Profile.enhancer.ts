import { connect } from 'react-redux';
import { compose } from 'recompose';

import { ProfileState } from 'Firebase/State';
import State from 'State';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

interface StateProps {
  profile: ProfileState;
}

export interface Props extends StateProps {
  handleHomeClick: () => void;
}

const mapStateToProps = ({ firebase: { firebase: { profile } } }: State): StateProps => ({ profile });

export default compose<Props, {}>(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
  }),
  connect(mapStateToProps),
);
