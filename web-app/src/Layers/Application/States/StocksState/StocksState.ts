import { Repository } from 'redux-repository/lib/interfaces';

import { Quote } from 'Layers/Business/Services/StocksService/IexService/Quote';

export type LogosState = Repository<string, string>;

export type QuotesState = Repository<Quote, string>;

export interface StocksState {
  logos: LogosState;
  quotes: QuotesState;
}
