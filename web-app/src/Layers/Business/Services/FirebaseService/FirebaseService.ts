import firebase from 'firebase/app';
import 'firebase/auth';

// TODO: Move to Infrastructure layer.
import * as C from 'Constants';
import { VibrantPalette } from 'Layers/Business/Services/FirebaseFunctionsService/VibrantPalette';

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

export const getVibrantColor = (
  vibrantPalette: VibrantPalette | null,
  type: 'vibrant' | 'light' | 'dark' | 'muted' | 'lightMuted' | 'darkMuted' = 'vibrant',
  opacity = 1,
): string => {
  if (vibrantPalette === null) {
    return 'none';
  }

  let color;

  switch (type) {
    case 'light':
      color = vibrantPalette.LightVibrant;
      break;
    case 'dark':
      color = vibrantPalette.DarkVibrant;
      break;
    case 'muted':
      color = vibrantPalette.Muted;
      break;
    case 'lightMuted':
      color = vibrantPalette.LightMuted;
      break;
    case 'darkMuted':
      color = vibrantPalette.DarkMuted;
      break;
    default:
      color = vibrantPalette.Vibrant;
      break;
  }

  return `rgba(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]}, ${opacity})`;
};
