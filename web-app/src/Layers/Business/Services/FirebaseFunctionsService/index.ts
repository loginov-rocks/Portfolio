// TODO: Move to Infrastructure layer.
import * as C from 'Constants';

import { FirebaseFunctions } from './FirebaseFunctions';

export const FirebaseFunctionsService = new FirebaseFunctions(C.FIREBASE_FUNCTIONS_URL);
