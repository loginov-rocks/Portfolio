/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { isExpired } from 'redux-repository/lib/resource';

import { fetchQuote } from '../actions/stocks';
import * as C from '../constants';

const mapStateToProps = ({ stocks: { quotes } }) => ({ quotes });

const mapDispatchToProps = { fetchQuote };

let digest;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      digest = setInterval(() => {
        const { fetchQuote, quotes } = this.props;
        const expired = [];

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
  mapProps(({ fetchQuote, quotes, ...props }) => props),
);
