/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { isExpired } from 'redux-repository/lib/resource';

import { fetchStockQuote } from '../actions';
import * as C from '../constants';

const mapStateToProps = ({ stockQuotes }) => ({ stockQuotes });

const mapDispatchToProps = { fetchStockQuote };

let digest;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      digest = setInterval(() => {
        const { fetchStockQuote, stockQuotes } = this.props;
        const expired = [];

        stockQuotes.allIds.forEach((symbol) => {
          const quote = getResourceById(stockQuotes, symbol);

          if (isExpired(quote, C.STOCK_QUOTE_TTL)) {
            expired.push(symbol);
            fetchStockQuote(symbol);
          }
        });

        console.log('Stock quotes updater working, expired:', expired);
      }, C.STOCK_QUOTES_UPDATER_INTERVAL);
    },

    componentWillUnmount() {
      clearInterval(digest);
    },

  }),
);
