import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';
import { getPositionsCollectionPath } from 'Layers/Business/Services/FirebaseService/FirebaseService';
import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';
import State from 'State';

export interface Props {
  positions: Position[];
  positionsLoading: boolean;
}

const mapStateToProps = ({ firebase: { firestore: { data } } }: State, { auth }: AuthConnectorProps): Props => {
  const rawPositions = data.positions;
  // `as string` used here because UID will be present at this point when using `withAuth`.
  const userId = auth.uid as string;
  let positions: Position[] = [];

  if (rawPositions) {
    positions = Object.keys(rawPositions).map((positionId) => {
      if (!rawPositions || rawPositions[positionId] === null) {
        return null;
      }

      return { id: positionId, ...rawPositions[positionId] };
    }).filter((position) => position !== null) as Position[];
  }

  return {
    positions,
    positionsLoading: !isLoaded(getPositionsCollectionPath(userId)),
  };
};

export default compose(
  AuthConnector,
  firestoreConnect(({ auth }: AuthConnectorProps) => [
    // `as string` used here because UID will be present at this point when using `withAuth`.
    {
      collection: getPositionsCollectionPath(auth.uid as string),
      storeAs: 'positions',
    },
  ]),
  connect(mapStateToProps),
);
