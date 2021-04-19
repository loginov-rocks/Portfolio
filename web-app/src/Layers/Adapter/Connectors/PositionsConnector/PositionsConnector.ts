import { connect, ConnectedProps } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import { PositionData, FIRESTORE_DATA_POSITIONS_KEY } from 'Layers/Application/States/FirebaseState/FirebaseState';
import State from 'State';

interface StateProps {
  positions: PositionData[];
  positionsLoading: boolean;
}

const mapStateToProps = ({ firebase: { firestore: { data } } }: State): StateProps => {
  const firestorePositions = data[FIRESTORE_DATA_POSITIONS_KEY];
  let positions: PositionData[] = [];

  if (firestorePositions) {
    positions = Object.keys(firestorePositions).map((positionId) => {
      if (!firestorePositions || firestorePositions[positionId] === null) {
        return null;
      }

      return { id: positionId, ...firestorePositions[positionId] };
    }).filter((position) => position !== null) as PositionData[];
  }

  return {
    positions,
    positionsLoading: !isLoaded(firestorePositions),
  };
};

export const PositionsConnector = connect(mapStateToProps);

export type PositionsConnectorProps = ConnectedProps<typeof PositionsConnector>;
