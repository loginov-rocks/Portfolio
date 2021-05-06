import { compose, mapProps, withProps } from 'recompose';

import {
  StockQuoteBySymbolMiddleware, StockQuoteBySymbolMiddlewareProps,
} from 'Layers/Behavior/Middlewares/StockQuoteBySymbolMiddleware/StockQuoteBySymbolMiddleware';
import { Position } from 'Layers/Business/Services/PortfolioService/Interfaces/Position';

import { createStockPosition, StockPosition } from '../lib';

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
  StockQuoteBySymbolMiddleware(),
  mapProps<Props, EnhancedProps & WithProps & StockQuoteBySymbolMiddlewareProps>(({
    position, quote, quoteProgress, ...props
  }) => ({
    position,
    stockPosition: position ? createStockPosition(position, quote, quoteProgress) : null,
    ...props,
  })),
);
