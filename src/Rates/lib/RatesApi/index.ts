import * as C from 'Constants';

import RatesApi from './RatesApi';

const singleton = new RatesApi(C.RATES_API_URL);

export default singleton;
