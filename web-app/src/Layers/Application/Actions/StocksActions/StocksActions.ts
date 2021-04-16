import { Action as ReduxRepositoryAction } from 'redux-repository/lib/types';

import { Quote } from 'Layers/Business/Services/StocksService/IexService/Quote';

export type LogoAction = ReduxRepositoryAction<string, string>;

export type QuoteAction = ReduxRepositoryAction<Quote, string>;
