/* @flow */

import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose, type HOC } from 'recompose';

import withAuth from 'User/enhancers/withAuth';

import * as C from '../../constants';

const mapStateToProps = (transform: Function) => ({ firebase: { data } }) => ({
  positions: transform(data[C.FIREBASE_POSITIONS_PATH] || {}),
  positionsLoading: !isLoaded(data[C.FIREBASE_POSITIONS_PATH]),
});

const withPositions: HOC<*, *> = (transform: Function = x => x) => compose(
  withAuth,
  firebaseConnect(({ auth }) => [
    {
      path: `${C.FIREBASE_POSITIONS_PATH}/${auth.uid}`,
      storeAs: C.FIREBASE_POSITIONS_PATH,
    },
  ]),
  connect(mapStateToProps(transform)),
);

export default withPositions;
