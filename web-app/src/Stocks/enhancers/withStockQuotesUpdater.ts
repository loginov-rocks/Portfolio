import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { isExpired } from 'redux-repository/lib/resource';

import * as C from 'Constants';
import State from 'State';

import { fetchQuote as fetchQuoteAction, FetchQuoteAction } from '../actions';
import Quote from '../lib/IEX/Quote';

// TODO: Tests.

interface StateProps {
  quotes: Repository<Quote, string>;
}

interface DispatchProps {
  fetchQuote: FetchQuoteAction;
}

const mapStateToProps = ({ stocks: { quotes } }: State): StateProps => ({ quotes });

const mapDispatchToProps = { fetchQuote: fetchQuoteAction };

let digest: number;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<StateProps & DispatchProps, Record<string, never>>({

    componentDidMount() {
      digest = window.setInterval(() => {
        const { fetchQuote, quotes } = this.props;
        const expired: string[] = [];

        quotes.allIds.forEach((symbol) => {
          const quote = getResourceById(quotes, symbol);

          if (isExpired(quote, C.STOCKS_QUOTES_TTL)) {
            expired.push(symbol);
            fetchQuote(symbol);
          }
        });

        console.log('Stock quotes updater working, expired:', expired);
      }, C.STOCKS_QUOTES_UPDATER_INTERVAL);
    },

    componentWillUnmount() {
      clearInterval(digest);
    },

  }),
  mapProps<Record<string, unknown>, StateProps & DispatchProps>(({
    fetchQuote, quotes, ...props // eslint-disable-line @typescript-eslint/no-unused-vars
  }) => ({ ...props })),
);
