import firebase from 'firebase/app';
import 'firebase/auth';

export const getAuthProvider = (provider: string): firebase.auth.AuthProvider => {
  switch (provider) {
    case 'google':
      return new firebase.auth.GoogleAuthProvider();

    default:
      throw new Error('Unknown auth provider');
  }
};
