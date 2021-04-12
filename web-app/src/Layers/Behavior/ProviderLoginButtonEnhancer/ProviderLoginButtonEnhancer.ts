import { withFirebase } from 'react-redux-firebase';
import { ComponentEnhancer, compose, withHandlers } from 'recompose';

import { getAuthProvider, WithFirebaseHocProps } from 'Firebase/lib';

export interface ProviderLoginButtonEnhancerInputProps {
  provider: string;
}

export interface ProviderLoginButtonEnhancerProps {
  handleClick: () => void;
}

// eslint-disable-next-line max-len
export const ProviderLoginButtonEnhancer = <OwnProps extends ProviderLoginButtonEnhancerInputProps>(): ComponentEnhancer<OwnProps & ProviderLoginButtonEnhancerProps, OwnProps> => (
  compose(
    withFirebase,
    withHandlers<OwnProps & WithFirebaseHocProps, ProviderLoginButtonEnhancerProps>({

      handleClick: ({ firebase, provider }) => () => {
        firebase.auth().signInWithRedirect(getAuthProvider(provider));
      },

    }),
  )
);
