/* @flow */

import { compose } from 'recompose';

import withStockLogoBySymbol from '../../../enhancers/withStockLogoBySymbol';
import withStockQuoteBySymbol from '../../../enhancers/withStockQuoteBySymbol';

export default compose(
  withStockLogoBySymbol,
  withStockQuoteBySymbol,
);
