import { ComponentEnhancer, compose, withHandlers } from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';

export interface ProviderLoginButtonEnhancerInputProps {
  provider: string;
}

export interface ProviderLoginButtonEnhancerProps {
  handleClick: () => void;
}

// eslint-disable-next-line max-len
export const ProviderLoginButtonEnhancer = <OwnProps extends ProviderLoginButtonEnhancerInputProps>(): ComponentEnhancer<OwnProps & ProviderLoginButtonEnhancerProps, OwnProps> => (
  compose(
    AuthConnector,
    withHandlers<OwnProps & AuthConnectorProps, ProviderLoginButtonEnhancerProps>({

      handleClick: ({ triggerSignIn, provider }) => () => {
        triggerSignIn(provider);
      },

    }),
  )
);
