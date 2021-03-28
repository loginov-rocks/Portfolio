import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { compose, branch, renderNothing } from 'recompose';

import { AuthState } from 'Firebase/State';
import State from 'State';

export interface Props {
  auth: AuthState;
}

const mapStateToProps = ({ firebase: { firebase: { auth } } }: State): Props => ({ auth });

export default compose(
  connect(mapStateToProps),
  branch<Props>(
    ({ auth }) => isEmpty(auth) || !isLoaded(auth),
    renderNothing,
  ),
);
