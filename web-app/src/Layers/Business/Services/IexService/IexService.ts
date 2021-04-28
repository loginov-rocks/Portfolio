import { IEX_API_URL, IEX_PUBLISHABLE_TOKEN } from 'Layers/Infrastructure/Constants/IexConstants/IexConstants';

import { IexApi } from './IexApi';

export const IexService = new IexApi(IEX_API_URL, IEX_PUBLISHABLE_TOKEN);
