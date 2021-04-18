import { compose, mapProps, withProps } from 'recompose';

import {
  StocksQuotesBySymbolsMiddleware, StocksQuotesBySymbolsMiddlewareProps,
} from 'Layers/Behavior/Middlewares/StocksQuotesBySymbolsMiddleware/StocksQuotesBySymbolsMiddleware';
import { getUniqueSymbolsFromPositions, Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';

import { createStockPosition, StockPosition } from '../lib';

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
  StocksQuotesBySymbolsMiddleware(),
  mapProps<Props, EnhancedProps & WithProps & StocksQuotesBySymbolsMiddlewareProps>(({
    positions, quotesBySymbols, symbols, ...props // eslint-disable-line @typescript-eslint/no-unused-vars
  }) => ({
    positions,
    stockPositions: positions.map((position) => createStockPosition(
      position, quotesBySymbols[position.symbol].quote, quotesBySymbols[position.symbol].progress,
    )),
    ...props,
  })),
);
