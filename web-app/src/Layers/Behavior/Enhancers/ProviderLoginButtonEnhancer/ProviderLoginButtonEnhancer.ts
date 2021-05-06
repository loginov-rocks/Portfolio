import { ComponentEnhancer, compose, withHandlers } from 'recompose';

import { AuthConnector, AuthConnectorProps } from 'Layers/Adapter/Connectors/AuthConnector/AuthConnector';

export interface ProviderLoginButtonEnhancerInputProps {
  provider: string;
}

interface WithHandlersProps {
  handleClick: () => void;
}

export type ProviderLoginButtonEnhancerProps = WithHandlersProps;

// eslint-disable-next-line max-len
export const ProviderLoginButtonEnhancer = <OwnProps extends ProviderLoginButtonEnhancerInputProps>(): ComponentEnhancer<OwnProps & ProviderLoginButtonEnhancerProps, OwnProps> => (
  compose(
    AuthConnector,
    withHandlers<OwnProps & AuthConnectorProps, WithHandlersProps>({

      handleClick: ({ triggerSignIn, provider }) => () => {
        triggerSignIn(provider);
      },

    }),
  )
);
