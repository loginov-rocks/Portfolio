import { compose, withProps, withState } from 'recompose';

import withCurrency from 'Currencies/enhancers/withCurrency';

import { calculateTotals, StockPosition } from '../../lib';
import { Props } from './Totals';

interface EnhancedProps {
  showClosed?: boolean;
  stockPositions: StockPosition[];
}

export default compose<Props, EnhancedProps>(
  withState<EnhancedProps, HTMLElement | null, 'anchor', 'updateAnchor'>('anchor', 'updateAnchor', null),
  withProps<Partial<Props>, EnhancedProps>(({ stockPositions }) => calculateTotals(stockPositions)),
  withCurrency,
);
