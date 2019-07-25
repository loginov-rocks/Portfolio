import * as firebase from 'firebase/app';
import 'firebase/auth';

import * as C from 'Constants';

export interface GetFirebaseExtraArgument {
  (): firebase.app.App;
}

export interface WithFirebaseHocProps {
  firebase: firebase.app.App;
}

export const getAuthProvider = (provider: string): firebase.auth.AuthProvider => {
  switch (provider) {
    case 'google':
      return new firebase.auth.GoogleAuthProvider();

    default:
      throw new Error('Unknown auth provider');
  }
};

export const getPositionsCollectionPath = (userId: string): string => (
  `${C.FIRESTORE_USERS_COLLECTION}/${userId}/${C.FIRESTORE_POSITIONS_COLLECTION}`
);

export const getPositionDocumentPath = (userId: string, positionId: string): string => (
  `${C.FIRESTORE_USERS_COLLECTION}/${userId}/${C.FIRESTORE_POSITIONS_COLLECTION}/${positionId}`
);

export const getPositionsCollection = (
  firebaseInstance: firebase.app.App,
  userId: string,
): firebase.firestore.CollectionReference => (
  firebaseInstance.firestore()
    .collection(C.FIRESTORE_USERS_COLLECTION)
    .doc(userId)
    .collection(C.FIRESTORE_POSITIONS_COLLECTION)
);

export const getPositionDocument = (
  firebaseInstance: firebase.app.App,
  userId: string,
  positionId: string,
): firebase.firestore.DocumentReference => getPositionsCollection(firebaseInstance, userId).doc(positionId);
