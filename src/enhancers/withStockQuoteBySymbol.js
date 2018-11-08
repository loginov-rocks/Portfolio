/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { fetchStockQuote } from '../actions';

const mapStateToProps = ({ stockQuotes }) => ({ stockQuotes });

const mapDispatchToProps = { fetchStockQuote };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const { fetchStockQuote, symbol } = this.props;

      if (symbol) {
        fetchStockQuote(symbol);
      }
    },

    componentDidUpdate(prevProps) {
      const { fetchStockQuote, symbol } = this.props;

      if (symbol && symbol !== prevProps.symbol) {
        fetchStockQuote(symbol);
      }
    },

  }),
  withProps(({ stockQuotes, symbol }) => {
    const quote = getResourceById(stockQuotes, symbol);

    return {
      quote: extractData(quote),
      quoteProgress: isRequested(quote),
    };
  }),
);
