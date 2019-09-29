import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { areArraysEqual } from 'Shared/lib';
import State from 'State';

import { fetchQuote as fetchQuoteAction, FetchQuoteAction } from '../actions';
import Quote from '../lib/IEX/Quote';

// TODO: Tests.

interface EnhancedProps {
  symbols: string[];
}

interface StateProps {
  quotes: Repository<Quote, string>;
}

interface DispatchProps {
  fetchQuote: FetchQuoteAction;
}

interface QuotesBySymbols {
  [key: string]: {
    quote: Quote | null;
    progress: boolean;
  };
}

export interface Props extends EnhancedProps {
  quotesBySymbols: QuotesBySymbols;
}

const mapStateToProps = ({ stocks: { quotes } }: State): StateProps => ({ quotes });

const mapDispatchToProps = { fetchQuote: fetchQuoteAction };

export default compose<Props, EnhancedProps>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<EnhancedProps & StateProps & DispatchProps, {}>({

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
  mapProps<Props, EnhancedProps & StateProps & DispatchProps>(({
    fetchQuote, quotes, symbols, ...props // eslint-disable-line @typescript-eslint/no-unused-vars
  }) => {
    const quotesBySymbols: QuotesBySymbols = {};

    symbols.forEach(symbol => {
      const resource = getResourceById(quotes, symbol);

      quotesBySymbols[symbol] = {
        progress: isRequested(resource),
        quote: extractData(resource),
      };
    });

    return {
      quotesBySymbols,
      symbols,
      ...props,
    };
  }),
);
