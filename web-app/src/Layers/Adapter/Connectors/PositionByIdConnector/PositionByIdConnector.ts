import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import { PositionData, FIRESTORE_DATA_POSITIONS_KEY } from 'Layers/Application/States/FirebaseState/FirebaseState';
import State from 'State';

interface StateProps {
  position: PositionData | null;
  positionLoading: boolean;
}

interface PositionIdExtractor<OwnProps> {
  (ownProps: OwnProps): string;
}

const mapStateToProps = <OwnProps>(positionIdExtractor: PositionIdExtractor<OwnProps>) => (
  { firebase: { firestore: { data } } }: State, ownProps: OwnProps,
): StateProps => {
  const firestorePositions = data[FIRESTORE_DATA_POSITIONS_KEY];

  const positionId = positionIdExtractor(ownProps);
  let position: PositionData | null = null;

  if (firestorePositions && firestorePositions[positionId]) {
    position = { id: positionId, ...firestorePositions[positionId] } as PositionData;
  }

  return {
    position,
    positionLoading: !isLoaded(firestorePositions),
  };
};

// eslint-disable-next-line max-len
export const PositionByIdConnector = <OwnProps>(positionIdExtractor: PositionIdExtractor<OwnProps>): InferableComponentEnhancerWithProps<StateProps, OwnProps> => (
  connect(mapStateToProps(positionIdExtractor))
);

export type PositionByIdConnectorProps = StateProps;
