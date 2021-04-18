import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  StockQuoteData, StocksQuotesConnector, StocksQuotesConnectorProps,
} from 'Layers/Adapter/Connectors/StocksQuotesConnector/StocksQuotesConnector';

export interface StockQuoteBySymbolMiddlewareInputProps {
  symbol: string | null;
}

export interface StockQuoteBySymbolMiddlewareProps {
  quote: StockQuoteData;
  quoteProgress: boolean;
}

// eslint-disable-next-line max-len
export const StockQuoteBySymbolMiddleware = <OwnProps extends StockQuoteBySymbolMiddlewareInputProps>(): ComponentEnhancer<OwnProps & StockQuoteBySymbolMiddlewareProps, OwnProps> => (
  compose(
    StocksQuotesConnector,
    lifecycle<OwnProps & StocksQuotesConnectorProps, Record<string, never>>({

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
    mapProps<StockQuoteBySymbolMiddlewareProps, OwnProps & StocksQuotesConnectorProps>(({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fetchQuote, quotes, symbol, ...returnedProps
    }) => {
      const quote = symbol ? getResourceById(quotes, symbol) : null;

      return {
        quote: extractData(quote),
        quoteProgress: isRequested(quote),
        symbol,
        ...returnedProps,
      };
    }),
  )
);
