import { Action } from 'redux-repository/lib/types';

import { Quote } from 'Layers/Business/Services/IexService/Interfaces/Quote';

export const STOCKS_LOGOS_RESOURCE_ACTION_NAME = 'stocks/logos';

export const STOCKS_QUOTES_RESOURCE_ACTION_NAME = 'stocks/quotes';

export type LogoAction = Action<string, string>;

export type QuoteAction = Action<Quote, string>;
