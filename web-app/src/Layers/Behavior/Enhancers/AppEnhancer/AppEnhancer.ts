import { isEmpty, isLoaded } from 'react-redux-firebase';
import {
  branch, ComponentEnhancer, compose, lifecycle, withProps,
} from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';
import {
  CurrencyRatesConnector, CurrencyRatesConnectorProps,
} from 'Layers/Adapter/Connectors/CurrencyRatesConnector/CurrencyRatesConnector';
import {
  StocksQuotesUpdateMiddleware,
} from 'Layers/Behavior/Middlewares/StocksQuotesUpdateMiddleware/StocksQuotesUpdateMiddleware';

interface WithProps {
  isAuthenticated: boolean;
  progress: boolean;
}

export type AppEnhancerProps = WithProps & AuthConnectorProps & CurrencyRatesConnectorProps;

export const AppEnhancer = <OwnProps>(): ComponentEnhancer<OwnProps & AppEnhancerProps, OwnProps> => (
  compose(
    AuthConnector,
    withProps<WithProps, OwnProps & AuthConnectorProps>(({ auth }) => ({
      isAuthenticated: !isEmpty(auth) && isLoaded(auth),
      progress: !isLoaded(auth),
    })),
    branch<OwnProps & AuthConnectorProps & WithProps>(
      ({ isAuthenticated }) => isAuthenticated,
      StocksQuotesUpdateMiddleware(),
    ),
    CurrencyRatesConnector,
    lifecycle<OwnProps & AppEnhancerProps, Record<string, never>>({

      componentDidMount() {
        this.props.initialize();
      },

    }),
  )
);
