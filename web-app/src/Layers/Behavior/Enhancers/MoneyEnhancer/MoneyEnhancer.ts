import { ComponentEnhancer, compose } from 'recompose';

import {
  CurrencyRatesConnector, CurrencyRatesConnectorProps,
} from 'Layers/Adapter/Connectors/CurrencyRatesConnector/CurrencyRatesConnector';

export type MoneyEnhancerProps = CurrencyRatesConnectorProps;

export const MoneyEnhancer = <OwnProps>(): ComponentEnhancer<OwnProps & MoneyEnhancerProps, OwnProps> => (
  compose(
    CurrencyRatesConnector,
  )
);
