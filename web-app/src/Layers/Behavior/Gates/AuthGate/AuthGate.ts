import { isEmpty, isLoaded } from 'react-redux-firebase';
import {
  ComponentEnhancer, compose, branch, renderNothing,
} from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';

export type AuthGateProps = AuthConnectorProps;

export const AuthGate = <OwnProps>(): ComponentEnhancer<OwnProps & AuthGateProps, OwnProps> => (
  compose(
    AuthConnector,
    branch<AuthConnectorProps>(
      ({ auth }) => isEmpty(auth) || !isLoaded(auth),
      renderNothing,
    ),
  )
);
