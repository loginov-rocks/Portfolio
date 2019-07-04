import * as C from 'Constants';

import IEX from './IEX';

const instance = new IEX(C.IEX_API_URL, C.IEX_PUBLISHABLE_TOKEN);

export default instance;
