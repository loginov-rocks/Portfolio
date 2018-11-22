/* @flow */

import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'recompose';

import * as C from '../../constants';
import withAuth from '../../User/enhancers/withAuth';

const mapStateToProps = ({ firebase: { data } }) => ({
  positions: data[C.FIREBASE_POSITIONS_PATH] || {},
  positionsLoading: !isLoaded(data[C.FIREBASE_POSITIONS_PATH]),
});

export default compose(
  withAuth,
  firebaseConnect(({ auth }) => [
    {
      path: `${C.FIREBASE_POSITIONS_PATH}/${auth.uid}`,
      storeAs: C.FIREBASE_POSITIONS_PATH,
    },
  ]),
  connect(mapStateToProps),
);
