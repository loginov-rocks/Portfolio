import { compose, withProps } from 'recompose';

import withStockLogoBySymbol from '../../enhancers/withStockLogoBySymbol';
import withStockQuoteBySymbol from '../../enhancers/withStockQuoteBySymbol';
import { getQuotePrice } from '../../lib/stocks';

export default compose(
  withStockLogoBySymbol,
  withStockQuoteBySymbol,
  withProps(({ quote }) => ({
    price: getQuotePrice(quote),
  })),
);
