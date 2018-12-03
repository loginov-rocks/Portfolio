/* @flow */

import { compose, withProps, type HOC } from 'recompose';

import withStockLogoBySymbol from '../../enhancers/withStockLogoBySymbol';
import withStockQuoteBySymbol from '../../enhancers/withStockQuoteBySymbol';
import { getQuotePrice } from '../../lib/stocks';

type EnhancedComponentProps = {
  symbol: string,
};

const enhancer: HOC<*, EnhancedComponentProps> = compose(
  withStockLogoBySymbol,
  withStockQuoteBySymbol,
  withProps(({ quote }) => ({
    price: getQuotePrice(quote),
  })),
);

export default enhancer;
