import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { areArraysEqual } from 'Shared/lib';
import State from 'State';

import { FetchQuote, fetchQuote as fetchQuoteAction } from '../actions';
import Quote from '../lib/IEX/Quote';

// TODO: Tests.

interface EnhancedProps {
  symbols: string[];
}

interface StateProps {
  quotes: Repository<Quote, string>;
}

interface DispatchProps {
  fetchQuote: FetchQuote;
}

export interface Props extends EnhancedProps {
  quotes: (Quote | null)[];
  quotesProgress: boolean;
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
