import { compose, mapProps, withProps } from 'recompose';

import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';
import withStockQuoteBySymbol, { Props as WithStockQuoteBySymbolProps } from 'Stocks/enhancers/withStockQuoteBySymbol';

import { createStockPosition, StockPosition } from '../lib';

// TODO: Tests.

interface EnhancedProps {
  position: Position | null;
}

interface WithProps {
  symbol: string | null;
}

export interface Props extends EnhancedProps {
  stockPosition: StockPosition | null;
}

export default compose<Props, EnhancedProps>(
  withProps<WithProps, EnhancedProps>(({ position }) => ({ symbol: position ? position.symbol : null })),
  withStockQuoteBySymbol,
  mapProps<Props, EnhancedProps & WithProps & WithStockQuoteBySymbolProps>(({
    position, quote, quoteProgress, ...props
  }) => ({
    position,
    stockPosition: position ? createStockPosition(position, quote, quoteProgress) : null,
    ...props,
  })),
);
