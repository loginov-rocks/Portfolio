import { Repository } from 'redux-repository/lib/interfaces';

import Quote from './lib/IEX/Quote';

export default interface State {
  logos: Repository<string, string>;
  quotes: Repository<Quote, string>;
}
