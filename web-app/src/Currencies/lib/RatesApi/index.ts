import * as C from 'Constants';

import RatesApi from './RatesApi';

const singleton = new RatesApi(C.RATES_API_URL, C.DEFAULT_CURRENCY);

export default singleton;
