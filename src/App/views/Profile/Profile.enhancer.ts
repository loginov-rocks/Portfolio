import { connect } from 'react-redux';
import { compose } from 'recompose';

import State from 'State';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';
import { Props } from './Profile';

const mapStateToProps = ({ firebase: { firebase: { profile } } }: State): Partial<Props> => ({ profile });

export default compose<Props, {}>(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
  }),
  connect(mapStateToProps),
);
