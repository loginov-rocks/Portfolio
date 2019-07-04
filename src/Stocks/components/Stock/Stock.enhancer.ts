import { compose, withProps } from 'recompose';

import withStockLogoBySymbol from '../../enhancers/withStockLogoBySymbol';
import withStockQuoteBySymbol, { Props as WithStockQuoteBySymbolProps } from '../../enhancers/withStockQuoteBySymbol';
import { getQuotePrice } from '../../lib';
import { Props } from './Stock';

export interface EnhancedProps {
  symbol: string;
}

export default compose<Props, EnhancedProps>(
  withStockLogoBySymbol,
  withStockQuoteBySymbol,
  withProps<Partial<Props>, WithStockQuoteBySymbolProps>(({ quote }) => ({
    price: getQuotePrice(quote),
  })),
);
