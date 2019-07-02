import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { compose, branch, renderNothing } from 'recompose';

import { AuthState } from 'Firebase/State';
import State from 'State';

interface StateProps {
  auth: AuthState;
}

const mapStateToProps = ({ firebase: { firebase: { auth } } }: State): StateProps => ({ auth });

export default compose<StateProps, {}>(
  connect<StateProps, {}, {}, State>(mapStateToProps),
  branch<StateProps>(
    ({ auth }) => isEmpty(auth) || !isLoaded(auth),
    renderNothing,
  ),
);
