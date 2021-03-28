import { compose } from 'recompose';

import withStockLogoBySymbol from '../../enhancers/withStockLogoBySymbol';

import { Props } from './StockLogo';

interface EnhancedProps {
  className?: string;
  size?: number;
  symbol: string;
}

export default compose<Props, EnhancedProps>(withStockLogoBySymbol);
