import {
  FIREBASE_FUNCTIONS_URL,
} from 'Layers/Infrastructure/Constants/FirebaseFunctionsConstants/FirebaseFunctionsConstants';

import { FirebaseFunctionsApi } from './FirebaseFunctionsApi';

export const FirebaseFunctionsService = new FirebaseFunctionsApi(FIREBASE_FUNCTIONS_URL);
