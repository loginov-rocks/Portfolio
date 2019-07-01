import { connect } from 'react-redux';
import { compose } from 'recompose';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import { State } from '../../../reducer';
import * as R from '../../routes';

interface StateProps {
  profile: {
    avatarUrl?: string;
    displayName?: string;
    email?: string;
  };
}

export interface Props extends StateProps {
  handleHomeClick: () => void;
}

const mapStateToProps = ({ firebase: { profile } }: State): StateProps => ({ profile });

export default compose<Props, {}>(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
  }),
  connect(mapStateToProps),
);
