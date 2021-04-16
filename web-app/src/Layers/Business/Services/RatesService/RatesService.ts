// TODO: Move to Infrastructure layer.
import * as C from 'Constants';

import { RatesApi } from './RatesApi';

export const RatesService = new RatesApi(C.RATES_API_URL, C.DEFAULT_CURRENCY);
