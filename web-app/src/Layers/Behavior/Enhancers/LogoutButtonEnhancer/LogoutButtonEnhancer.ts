import { ComponentEnhancer, compose, withHandlers } from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';

export interface LogoutButtonEnhancerInputProps {
  onLogout?: () => void;
}

interface WithHandlersProps {
  handleClick: () => void;
}

export type LogoutButtonEnhancerProps = WithHandlersProps;

// eslint-disable-next-line max-len
export const LogoutButtonEnhancer = <OwnProps extends LogoutButtonEnhancerInputProps>(): ComponentEnhancer<OwnProps & LogoutButtonEnhancerProps, OwnProps> => (
  compose(
    AuthConnector,
    withHandlers<OwnProps & AuthConnectorProps, WithHandlersProps>({

      handleClick: ({ triggerLogout, onLogout }) => () => {
        triggerLogout();

        if (onLogout) {
          onLogout();
        }
      },

    }),
  )
);
