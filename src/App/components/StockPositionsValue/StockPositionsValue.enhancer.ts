import { compose, withProps } from 'recompose';

import { getUniqueSymbolsFromPositions, Position } from 'Portfolio/lib';
import withStockQuotesBySymbols, { Props as WithStockQuotesBySymbols } from 'Stocks/enhancers/withStockQuotesBySymbols';
import { getQuotePrice } from 'Stocks/lib';

import { Props } from './StockPositionsValue';

export interface EnhancedProps {
  positions: Position[];
}

interface WithProps {
  symbols: string[];
}

export default compose<Props, EnhancedProps>(
  withProps<WithProps, EnhancedProps>(({ positions }) => ({
    symbols: getUniqueSymbolsFromPositions(positions),
  })),
  withStockQuotesBySymbols,
  withProps<Partial<Props>, EnhancedProps & WithStockQuotesBySymbols>(({ positions, quotes, quotesProgress }) => {
    let value = 0;

    if (!quotesProgress) {
      value = positions
        .map(position => {
          const { amount, symbol } = position;
          const quote = quotes.find(q => q && q.symbol === symbol) || null;

          return amount * getQuotePrice(quote);
        })
        .reduce((a, b) => a + b, 0);
    }

    return { value };
  }),
);
