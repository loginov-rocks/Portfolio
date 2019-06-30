import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { areArraysEqual } from 'Shared/lib/utils';

import { fetchQuote as fetchQuoteAction } from '../actions';

interface Props {
  fetchQuote: (symbol: string) => void;
  symbols: string[];
}

const mapStateToProps = ({ stocks: { quotes } }): { quotes: [] } => ({ quotes });

const mapDispatchToProps = { fetchQuote: fetchQuoteAction };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<Props, {}>({

    componentDidMount() {
      const { fetchQuote, symbols } = this.props;

      symbols.forEach(symbol => fetchQuote(symbol));
    },

    componentDidUpdate(prevProps) {
      const { fetchQuote, symbols } = this.props;

      if (!areArraysEqual(symbols, prevProps.symbols)) {
        symbols.forEach(symbol => fetchQuote(symbol));
      }
    },

  }),
  mapProps(({
    fetchQuote, quotes, symbols, ...props
  }) => {
    let quotesProgress = false;

    const quotesArray = symbols
      .map(symbol => {
        const resource = getResourceById(quotes, symbol);

        if (isRequested(resource)) {
          quotesProgress = true;
        }

        return extractData(resource);
      })
      .filter(value => !!value);

    return {
      quotes: quotesArray,
      quotesProgress,
      symbols,
      ...props,
    };
  }),
);
