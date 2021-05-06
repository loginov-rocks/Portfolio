import firebase from 'firebase';

import {
  FIRESTORE_POSITIONS_COLLECTION, FIRESTORE_USERS_COLLECTION,
} from 'Layers/Infrastructure/Constants/FirestoreConstants/FirestoreConstants';

export const getPositionsCollectionPath = (userId: string): string => (
  `${FIRESTORE_USERS_COLLECTION}/${userId}/${FIRESTORE_POSITIONS_COLLECTION}`
);

export const getPositionsCollection = (
  firebaseInstance: firebase.app.App,
  userId: string,
): firebase.firestore.CollectionReference => (
  firebaseInstance.firestore()
    .collection(FIRESTORE_USERS_COLLECTION)
    .doc(userId)
    .collection(FIRESTORE_POSITIONS_COLLECTION)
);

export const getPositionDocument = (
  firebaseInstance: firebase.app.App,
  userId: string,
  positionId: string,
): firebase.firestore.DocumentReference => getPositionsCollection(firebaseInstance, userId).doc(positionId);
