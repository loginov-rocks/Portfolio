import { ComponentEnhancer, compose, withHandlers } from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';

export interface LogoutButtonEnhancerInputProps {
  onLogout?: () => void;
}

export interface LogoutButtonEnhancerProps {
  handleClick: () => void;
}

// eslint-disable-next-line max-len
export const LogoutButtonEnhancer = <OwnProps extends LogoutButtonEnhancerInputProps>(): ComponentEnhancer<OwnProps & LogoutButtonEnhancerProps, OwnProps> => (
  compose(
    AuthConnector,
    withHandlers<OwnProps & AuthConnectorProps, LogoutButtonEnhancerProps>({

      handleClick: ({ triggerLogout, onLogout }) => () => {
        triggerLogout();

        if (onLogout) {
          onLogout();
        }
      },

    }),
  )
);
