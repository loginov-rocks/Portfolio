import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'recompose';

import { getPositionsCollectionPath } from 'Firebase/lib';
import State from 'State';
import withAuth, { Props as WithAuthProps } from 'User/enhancers/withAuth';

import { Position } from '../lib';

// TODO: Tests.

export interface Props {
  position: Position | null;
  positionLoading: boolean;
}

interface PositionIdExtractor<OwnProps> {
  (ownProps: OwnProps): string;
}

const mapStateToProps = <OwnProps>(positionIdExtractor: PositionIdExtractor<OwnProps>) => (
  { firebase: { firestore: { data } } }: State, ownProps: OwnProps & WithAuthProps,
): Props => {
  // `as string` used here because UID will be present at this point when using `withAuth`.
  const userId = ownProps.auth.uid as string;

  const positionId = positionIdExtractor(ownProps);
  let position: Position | null = null;

  if (data.users) {
    const user = data.users[userId];

    if (user && user.positions && user.positions[positionId]) {
      position = Object.assign({ id: positionId }, user.positions[positionId]);
    }
  }

  return {
    position,
    positionLoading: !isLoaded(getPositionsCollectionPath(userId)),
  };
};

export default <OwnProps>(positionIdExtractor: PositionIdExtractor<OwnProps>) => compose(
  withAuth,
  firestoreConnect(({ auth }: WithAuthProps) => [
    // `getPositionDocumentPath` is not used here, because it leads to listeners switching and DOCUMENT_ADDED events
    // flood. `as string` used here because UID will be present at this point when using `withAuth`.
    getPositionsCollectionPath(auth.uid as string),
  ]),
  connect(mapStateToProps(positionIdExtractor)),
);
