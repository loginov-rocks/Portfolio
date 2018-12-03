/* @flow */

import { connect } from 'react-redux';
import {
  compose, lifecycle, mapProps, type HOC,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { fetchQuote } from '../actions';

type EnhancedComponentProps = {
  symbol: string,
};

const mapStateToProps = ({ stocks: { quotes } }) => ({ quotes });

const mapDispatchToProps = { fetchQuote };

const withStockQuoteBySymbol: HOC<*, EnhancedComponentProps> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const { fetchQuote, symbol } = this.props;

      if (symbol) {
        fetchQuote(symbol);
      }
    },

    componentDidUpdate(prevProps) {
      const { fetchQuote, symbol } = this.props;

      if (symbol && symbol !== prevProps.symbol) {
        fetchQuote(symbol);
      }
    },

  }),
  mapProps(({ fetchQuote, quotes, symbol, ...props }) => {
    const quote = getResourceById(quotes, symbol);

    return {
      quote: extractData(quote),
      quoteProgress: isRequested(quote),
      symbol,
      ...props,
    };
  }),
);

export default withStockQuoteBySymbol;
