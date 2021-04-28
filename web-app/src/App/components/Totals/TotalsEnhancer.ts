import {
  ComponentEnhancer, compose, lifecycle, withProps, withState,
} from 'recompose';

import {
  CurrencyRatesConnector, CurrencyRatesConnectorProps,
} from 'Layers/Adapter/Connectors/CurrencyRatesConnector/CurrencyRatesConnector';

import { calculateTotals, StockPosition, Totals } from '../../lib';

export interface TotalsEnhancerInputProps {
  stockPositions: StockPosition[];
}

interface WithStateProps {
  anchor: HTMLElement | null;
  updateAnchor: (anchor: HTMLElement | null) => void;
}

export type TotalsEnhancerProps = WithStateProps & Totals & CurrencyRatesConnectorProps;

// eslint-disable-next-line max-len
export const TotalsEnhancer = <OwnProps extends TotalsEnhancerInputProps>(): ComponentEnhancer<OwnProps & TotalsEnhancerProps, OwnProps> => (
  compose(
    withState<WithStateProps, HTMLElement | null, 'anchor', 'updateAnchor'>('anchor', 'updateAnchor', null),
    withProps<Partial<TotalsEnhancerProps>, OwnProps & WithStateProps>(({
      stockPositions,
    }) => calculateTotals(stockPositions)),
    CurrencyRatesConnector,
    lifecycle<CurrencyRatesConnectorProps, Record<string, never>>({

      componentDidMount() {
        this.props.fetchRates();
      },

    }),
  )
);
