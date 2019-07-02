import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'recompose';

import { getPositionDocumentPath, getPositionsCollectionPath } from 'Firebase/lib';
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
  { firebase: { firestore: { ordered } } }: State, ownProps: OwnProps & WithAuthProps,
): Props => {
  const positionId = positionIdExtractor(ownProps);
  let position: Position | null = null;

  if (ordered.users) {
    const user = ordered.users.find(({ id }) => id === ownProps.auth.uid);

    if (user && user.positions) {
      position = user.positions.find(p => p.id === positionId) || null;
    }
  }

  return {
    position,
    // `as string` used because uid should be present at this point when using withAuth.
    positionLoading: !isLoaded(getPositionsCollectionPath(ownProps.auth.uid as string)),
  };
};

export default <OwnProps>(positionIdExtractor: PositionIdExtractor<OwnProps>) => compose(
  withAuth,
  firestoreConnect((props: OwnProps & WithAuthProps) => {
    const positionId = positionIdExtractor(props);

    return [
      // `as string` used because uid should be present at this point when using withAuth.
      getPositionDocumentPath(props.auth.uid as string, positionId),
    ];
  }),
  connect(mapStateToProps(positionIdExtractor)),
);
