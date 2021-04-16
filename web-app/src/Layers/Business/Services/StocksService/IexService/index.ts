import * as C from 'Constants';

import { IexApi } from './IexApi';

export const IexService = new IexApi(C.IEX_API_URL, C.IEX_PUBLISHABLE_TOKEN);
