import { Repository } from 'redux-repository/lib/interfaces';

import { Quote } from 'Layers/Business/Services/IexService/Interfaces/Quote';

export type LogoData = string | null;

export type LogosState = Repository<string, string>;

export type QuoteData = Quote | null;

export type QuotesState = Repository<Quote, string>;

export interface StocksState {
  logos: LogosState;
  quotes: QuotesState;
}
