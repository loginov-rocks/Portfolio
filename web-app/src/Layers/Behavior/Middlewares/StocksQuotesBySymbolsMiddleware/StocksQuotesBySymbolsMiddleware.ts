import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  StockQuoteData, StocksQuotesConnector, StocksQuotesConnectorProps,
} from 'Layers/Adapter/Connectors/StocksQuotesConnector/StocksQuotesConnector';
// TODO: Move to Infrastructure layer.
import { areArraysEqual } from 'Shared/lib';

interface StocksQuotesBySymbolsMiddlewareInputProps {
  symbols: string[];
}

interface QuotesBySymbols {
  [key: string]: {
    quote: StockQuoteData;
    progress: boolean;
  };
}

export interface StocksQuotesBySymbolsMiddlewareProps {
  quotesBySymbols: QuotesBySymbols;
}

// eslint-disable-next-line max-len
export const StocksQuotesBySymbolsMiddleware = <OwnProps extends StocksQuotesBySymbolsMiddlewareInputProps>(): ComponentEnhancer<OwnProps & StocksQuotesBySymbolsMiddlewareProps, OwnProps> => (
  compose(
    StocksQuotesConnector,
    lifecycle<OwnProps & StocksQuotesConnectorProps, Record<string, never>>({

      componentDidMount() {
        const { fetchQuote, symbols } = this.props;

        symbols.forEach((symbol) => fetchQuote(symbol));
      },

      componentDidUpdate(prevProps) {
        const { fetchQuote, symbols } = this.props;

        if (!areArraysEqual(symbols, prevProps.symbols)) {
          symbols.forEach((symbol) => fetchQuote(symbol));
        }
      },

    }),
    mapProps<StocksQuotesBySymbolsMiddlewareProps, OwnProps & StocksQuotesConnectorProps>(({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fetchQuote, quotes, symbols, ...returnedProps
    }) => {
      const quotesBySymbols: QuotesBySymbols = {};

      symbols.forEach((symbol) => {
        const resource = getResourceById(quotes, symbol);

        quotesBySymbols[symbol] = {
          progress: isRequested(resource),
          quote: extractData(resource),
        };
      });

      return {
        quotesBySymbols,
        symbols,
        ...returnedProps,
      };
    }),
  )
);
