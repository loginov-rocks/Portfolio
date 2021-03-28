import { compose, mapProps, withProps } from 'recompose';

import { getUniqueSymbolsFromPositions, Position } from 'Portfolio/lib';
import withStockQuotesBySymbols, {
  Props as WithStockQuotesBySymbolsProps,
} from 'Stocks/enhancers/withStockQuotesBySymbols';

import { createStockPosition, StockPosition } from '../lib';

// TODO: Tests.

interface EnhancedProps {
  positions: Position[];
}

interface WithProps {
  symbols: string[];
}

export interface Props extends EnhancedProps {
  stockPositions: StockPosition[];
}

export default compose<Props, EnhancedProps>(
  withProps<WithProps, EnhancedProps>(({ positions }) => ({
    symbols: getUniqueSymbolsFromPositions(positions),
  })),
  withStockQuotesBySymbols,
  mapProps<Props, EnhancedProps & WithProps & WithStockQuotesBySymbolsProps>(({
    positions, quotesBySymbols, symbols, ...props // eslint-disable-line @typescript-eslint/no-unused-vars
  }) => ({
    positions,
    stockPositions: positions.map(position => createStockPosition(
      position, quotesBySymbols[position.symbol].quote, quotesBySymbols[position.symbol].progress,
    )),
    ...props,
  })),
);
