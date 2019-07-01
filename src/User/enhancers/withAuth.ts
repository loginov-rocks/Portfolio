import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { compose, branch, renderNothing } from 'recompose';

import { State } from '../../reducer';

interface StateProps {
  auth: any;
}

const mapStateToProps = ({ firebase: { auth } }: State): StateProps => ({ auth });

export default compose<StateProps, {}>(
  connect<StateProps, {}, {}, State>(mapStateToProps),
  branch<StateProps>(
    ({ auth }) => isEmpty(auth) || !isLoaded(auth),
    renderNothing,
  ),
);
