import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';
import { FIRESTORE_DATA_POSITIONS_KEY } from 'Layers/Application/States/FirebaseState/FirebaseState';
import { getPositionsCollectionPath } from 'Layers/Business/Services/FirebaseService/FirebaseService';

export type PositionsFirestoreConnectorProps = AuthConnectorProps;

export const PositionsFirestoreConnector = compose(
  AuthConnector,
  firestoreConnect(({ auth }: AuthConnectorProps) => {
    const userId = auth.uid;

    if (!userId) {
      throw new Error('User ID missing');
    }

    return [
      {
        collection: getPositionsCollectionPath(userId),
        storeAs: FIRESTORE_DATA_POSITIONS_KEY,
      },
    ];
  }),
);
