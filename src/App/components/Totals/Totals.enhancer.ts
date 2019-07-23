import { compose, withProps } from 'recompose';

import withCurrency from 'Currencies/enhancers/withCurrency';

import { Props } from './Totals';
import { calculateTotals, StockPosition } from '../../lib';

interface EnhancedProps {
  showClosed?: boolean;
  stockPositions: StockPosition[];
}

export default compose<Props, EnhancedProps>(
  withProps<Partial<Props>, EnhancedProps>(({ stockPositions }) => calculateTotals(stockPositions)),
  withCurrency,
);
