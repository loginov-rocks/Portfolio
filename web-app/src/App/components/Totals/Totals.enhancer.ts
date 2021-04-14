import {
  compose, lifecycle, withProps, withState,
} from 'recompose';

import {
  CurrencyConnector, CurrencyConnectorProps,
} from 'Layers/Adapter/Connectors/CurrencyConnector/CurrencyConnector';

import { calculateTotals, StockPosition } from '../../lib';
import { Props } from './Totals';

interface EnhancedProps {
  showClosed?: boolean;
  stockPositions: StockPosition[];
}

export default compose<Props, EnhancedProps>(
  withState<EnhancedProps, HTMLElement | null, 'anchor', 'updateAnchor'>('anchor', 'updateAnchor', null),
  withProps<Partial<Props>, EnhancedProps>(({ stockPositions }) => calculateTotals(stockPositions)),
  CurrencyConnector,
  lifecycle<CurrencyConnectorProps, Record<string, never>>({

    componentDidMount() {
      this.props.fetchRates();
    },

  }),
);
