import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'recompose';

import { getPositionsCollectionPath } from 'Firebase/lib';
import State from 'State';
import withAuth, { Props as WithAuthProps } from 'User/enhancers/withAuth';

import { Position } from '../lib';

// TODO: Tests.

export interface Props {
  positions: Position[];
  positionsLoading: boolean;
}

const mapStateToProps = ({ firebase: { firestore: { ordered } } }: State, { auth }: WithAuthProps): Props => {
  let positions: Position[] = [];

  if (ordered.users) {
    const user = ordered.users.find(({ id }) => id === auth.uid);

    if (user && user.positions) {
      ({ positions } = user);
    }
  }

  return ({
    positions,
    // `as string` used because uid should be present at this point when using withAuth.
    positionsLoading: !isLoaded(getPositionsCollectionPath(auth.uid as string)),
  });
};

export default compose(
  withAuth,
  firestoreConnect(({ auth }: WithAuthProps) => [
    getPositionsCollectionPath(auth.uid as string),
  ]),
  connect(mapStateToProps),
);
