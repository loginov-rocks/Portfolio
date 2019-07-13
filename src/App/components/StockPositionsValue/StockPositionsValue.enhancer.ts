import { compose, withProps } from 'recompose';

import { getUniqueSymbolsFromPositions, Position } from 'Portfolio/lib';
import withStockQuotesBySymbols, {
  Props as WithStockQuotesBySymbolsProps,
} from 'Stocks/enhancers/withStockQuotesBySymbols';
import { getQuotePrice } from 'Stocks/lib';

import { Props } from './StockPositionsValue';

interface EnhancedProps {
  positions: Position[];
}

interface WithProps {
  symbols: string[];
}

export default compose<Props, EnhancedProps>(
  withProps<EnhancedProps, EnhancedProps>(({ positions }) => ({
    positions: positions.filter(position => position.closeDate === null),
  })),
  withProps<WithProps, EnhancedProps>(({ positions }) => ({
    symbols: getUniqueSymbolsFromPositions(positions),
  })),
  withStockQuotesBySymbols,
  withProps<Partial<Props>, EnhancedProps & WithStockQuotesBySymbolsProps>(({ positions, quotesBySymbols }) => {
    const value = positions
      .map(position => {
        const marketPrice = getQuotePrice(quotesBySymbols[position.symbol].quote);

        if (marketPrice === null) {
          return 0;
        }

        return position.amount * marketPrice;
      })
      .reduce((a, b) => a + b, 0);

    return { value };
  }),
);
