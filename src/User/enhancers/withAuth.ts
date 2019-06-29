/* @flow */

import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import {
  compose, branch, renderNothing, type HOC,
} from 'recompose';

const mapStateToProps = ({ firebase: { auth } }) => ({ auth });

const withAuth: HOC<*, *> = compose(
  connect(mapStateToProps),
  branch(
    ({ auth }) => isEmpty(auth) || !isLoaded(auth),
    renderNothing,
  ),
);

export default withAuth;
