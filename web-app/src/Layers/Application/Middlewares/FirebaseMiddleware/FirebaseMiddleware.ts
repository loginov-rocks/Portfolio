import firebase from 'firebase/app';

export interface GetFirebaseExtraArgument {
  (): firebase.app.App;
}
