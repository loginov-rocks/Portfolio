import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'recompose';

import * as C from 'Constants';
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
  const rawPositions = data[C.STATE_FIREBASE_POSITIONS_KEY];
  // `as string` used here because UID will be present at this point when using `withAuth`.
  const userId = auth.uid as string;
  let positions: Position[] = [];

  if (rawPositions) {
    positions = Object.keys(rawPositions).map(positionId => {
      if (!rawPositions || rawPositions[positionId] === null) {
        return null;
      }

      return { id: positionId, ...rawPositions[positionId] };
    }).filter(position => position !== null) as Position[];
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
    {
      collection: getPositionsCollectionPath(auth.uid as string),
      storeAs: C.STATE_FIREBASE_POSITIONS_KEY,
    },
  ]),
  connect(mapStateToProps),
);
