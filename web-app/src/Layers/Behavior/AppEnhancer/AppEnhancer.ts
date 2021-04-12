import { isEmpty, isLoaded } from 'react-redux-firebase';
import {
  branch, ComponentEnhancer, compose, withProps,
} from 'recompose';

import { AppConnector, AppConnectorProps } from 'Layers/Adapter/AppConnector/AppConnector';
import { StockQuotesUpdater } from 'Layers/Behavior/StockQuotesUpdater/StockQuotesUpdater';

export interface AppEnhancerProps {
  isAuthenticated: boolean;
  progress: boolean;
}

export const AppEnhancer = <OwnProps>(): ComponentEnhancer<OwnProps & AppEnhancerProps, OwnProps> => (
  compose(
    AppConnector,
    withProps<AppEnhancerProps, AppConnectorProps>(({ auth }) => ({
      isAuthenticated: !isEmpty(auth) && isLoaded(auth),
      progress: !isLoaded(auth),
    })),
    branch<AppEnhancerProps>(
      ({ isAuthenticated }) => isAuthenticated,
      StockQuotesUpdater(),
    ),
  )
);
