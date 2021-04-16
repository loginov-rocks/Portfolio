import { isEmpty, isLoaded } from 'react-redux-firebase';
import {
  branch, ComponentEnhancer, compose, withProps,
} from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';
import {
  StocksQuotesUpdateMiddleware,
} from 'Layers/Behavior/Middlewares/StocksQuotesUpdateMiddleware/StocksQuotesUpdateMiddleware';

export interface AppEnhancerProps {
  isAuthenticated: boolean;
  progress: boolean;
}

export const AppEnhancer = <OwnProps>(): ComponentEnhancer<OwnProps & AppEnhancerProps, OwnProps> => (
  compose(
    AuthConnector,
    withProps<AppEnhancerProps, AuthConnectorProps>(({ auth }) => ({
      isAuthenticated: !isEmpty(auth) && isLoaded(auth),
      progress: !isLoaded(auth),
    })),
    branch<AppEnhancerProps>(
      ({ isAuthenticated }) => isAuthenticated,
      StocksQuotesUpdateMiddleware(),
    ),
  )
);
