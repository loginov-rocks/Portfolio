import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { ComponentEnhancer, compose } from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';
import { getPositionsCollectionPath } from 'Layers/Business/Services/FirebaseService/FirebaseService';
import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';
import State from 'State';

export interface Props {
  position: Position | null;
  positionLoading: boolean;
}

interface PositionIdExtractor<OwnProps> {
  (ownProps: OwnProps): string;
}

const mapStateToProps = <OwnProps>(positionIdExtractor: PositionIdExtractor<OwnProps>) => (
  { firebase: { firestore: { data } } }: State, ownProps: OwnProps & AuthConnectorProps,
): Props => {
  const rawPositions = data.positions;
  // `as string` used here because UID will be present at this point when using `withAuth`.
  const userId = ownProps.auth.uid as string;

  const positionId = positionIdExtractor(ownProps);
  let position: Position | null = null;

  if (rawPositions && rawPositions[positionId]) {
    position = { id: positionId, ...rawPositions[positionId] } as Position;
  }

  return {
    position,
    positionLoading: !isLoaded(getPositionsCollectionPath(userId)),
  };
};

export default <OwnProps>(
  positionIdExtractor: PositionIdExtractor<OwnProps>,
): ComponentEnhancer<Props, OwnProps> => compose(
  AuthConnector,
  firestoreConnect(({ auth }: AuthConnectorProps) => [
    // `getPositionDocumentPath` is not used here, because it leads to listeners switching and DOCUMENT_ADDED events
    // flood. `as string` used here because UID will be present at this point when using `withAuth`.
    {
      collection: getPositionsCollectionPath(auth.uid as string),
      storeAs: 'positions',
    },
  ]),
  connect(mapStateToProps(positionIdExtractor)),
);
