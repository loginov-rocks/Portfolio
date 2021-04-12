import { Repository } from 'redux-repository/lib/interfaces';

import Quote from './lib/IEX/Quote';

export type QuotesState = Repository<Quote, string>;

export default interface State {
  logos: Repository<string, string>;
  quotes: QuotesState;
} // eslint-disable-line semi
