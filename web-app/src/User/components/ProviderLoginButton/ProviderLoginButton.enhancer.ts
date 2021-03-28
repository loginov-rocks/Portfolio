import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { getAuthProvider, WithFirebaseHocProps } from 'Firebase/lib';

import { Props } from './ProviderLoginButton';

interface EnhancedProps {
  provider: string;
}

interface WithHandlersProps {
  handleClick: () => void;
}

export default compose<Props & WithFirebaseHocProps & EnhancedProps, EnhancedProps>(
  withFirebase,
  withHandlers<EnhancedProps & WithFirebaseHocProps, WithHandlersProps>({

    handleClick: ({ firebase, provider }) => () => {
      firebase.auth().signInWithRedirect(getAuthProvider(provider));
    },

  }),
);
