import { Repository } from 'redux-repository/lib/interfaces';

import Quote from './lib/IEX/Quote';

export type LogosState = Repository<string, string>;

export type QuotesState = Repository<Quote, string>;

export default interface State {
  logos: LogosState;
  quotes: QuotesState;
} // eslint-disable-line semi
