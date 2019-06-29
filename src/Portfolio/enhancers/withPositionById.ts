import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'recompose';

import withAuth from 'User/enhancers/withAuth';

import * as C from '../../constants';

interface ExtractPositionId {
  (ownProps: {}): string
}

const mapStateToProps = (extractPositionId: ExtractPositionId) => ({ firebase: { data } }, ownProps) => {
  const positionId = extractPositionId(ownProps);
  const positionData = data[C.FIREBASE_POSITIONS_PATH] && data[C.FIREBASE_POSITIONS_PATH][positionId];

  return {
    position: Object.assign({ id: positionId }, positionData),
    positionLoading: !isLoaded(positionData),
  };
};

export default (extractPositionId: ExtractPositionId) => compose(
  withAuth,
  firebaseConnect(props => {
    const { auth } = props;
    const positionId = extractPositionId(props);

    return [
      {
        path: `${C.FIREBASE_POSITIONS_PATH}/${auth.uid}/${positionId}`,
        storeAs: `${C.FIREBASE_POSITIONS_PATH}/${positionId}`,
      },
    ];
  }),
  connect(mapStateToProps(extractPositionId)),
);
