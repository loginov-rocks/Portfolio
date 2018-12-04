/* @flow */

import { compose, withProps, type HOC } from 'recompose';

import type { Position } from 'Portfolio/lib/flow';
import { getUniqueSymbolsFromPositions } from 'Portfolio/lib/portfolio';
import withStockQuotesBySymbols
  from 'Stocks/enhancers/withStockQuotesBySymbols';
import { getQuotePrice } from 'Stocks/lib/stocks';

type EnhancedComponentProps = {
  positions: Array<Position>,
}

const enhancer: HOC<*, EnhancedComponentProps> = compose(
  withProps(({ positions }) => ({
    symbols: getUniqueSymbolsFromPositions(positions),
  })),
  withStockQuotesBySymbols,
  withProps(({ positions, quotes, quotesProgress }) => {
    let value = 0;

    if (!quotesProgress) {
      value = positions
        .map((position) => {
          const { amount, symbol } = position;
          const quote = quotes.find(q => q.symbol === symbol);

          return amount * getQuotePrice(quote);
        })
        .reduce((a, b) => a + b, 0);
    }

    return { value };
  }),
);

export default enhancer;
