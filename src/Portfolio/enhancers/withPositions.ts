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

const mapStateToProps = ({ firebase: { firestore: { data } } }: State, { auth }: WithAuthProps): Props => {
  // `as string` used here because UID will be present at this point when using `withAuth`.
  const userId = auth.uid as string;

  let positions: Position[] = [];

  if (data.users) {
    const user = data.users[userId];

    if (user && user.positions) {
      positions = Object.keys(user.positions).map(positionId => {
        if (!user.positions || user.positions[positionId] === null) {
          return null;
        }

        return Object.assign({ id: positionId }, user.positions[positionId]);
      }).filter(position => position !== null) as Position[];
    }
  }

  return {
    positions,
    positionsLoading: !isLoaded(getPositionsCollectionPath(userId)),
  };
};

export default compose(
  withAuth,
  firestoreConnect(({ auth }: WithAuthProps) => [
    // `as string` used here because UID will be present at this point when using `withAuth`.
    getPositionsCollectionPath(auth.uid as string),
  ]),
  connect(mapStateToProps),
);
