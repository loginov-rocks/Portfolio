import * as C from 'Constants';

import Functions from './Functions';

const singleton = new Functions(C.FIREBASE_FUNCTIONS_URL);

export default singleton;
