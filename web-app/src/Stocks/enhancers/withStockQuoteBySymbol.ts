import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  fetchQuote as fetchQuoteAction, FetchQuoteAction,
} from 'Layers/Application/ActionCreators/StocksActionCreators/StocksActionCreators';
import { Quote } from 'Layers/Business/Services/StocksService/IexService/Quote';
import State from 'State';

// TODO: Tests.

interface EnhancedProps {
  symbol: string | null;
}

interface StateProps {
  quotes: Repository<Quote, string>;
}

interface DispatchProps {
  fetchQuote: FetchQuoteAction;
}

export interface Props extends EnhancedProps {
  quote: Quote | null;
  quoteProgress: boolean;
}

const mapStateToProps = ({ stocks: { quotes } }: State): StateProps => ({ quotes });

const mapDispatchToProps = { fetchQuote: fetchQuoteAction };

export default compose<Props, EnhancedProps>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<EnhancedProps & StateProps & DispatchProps, Record<string, never>>({

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
  mapProps<Props, EnhancedProps & StateProps & DispatchProps>(({
    fetchQuote, quotes, symbol, ...props // eslint-disable-line @typescript-eslint/no-unused-vars
  }) => {
    const quote = symbol ? getResourceById(quotes, symbol) : null;

    return {
      quote: extractData(quote),
      quoteProgress: isRequested(quote),
      symbol,
      ...props,
    };
  }),
);
