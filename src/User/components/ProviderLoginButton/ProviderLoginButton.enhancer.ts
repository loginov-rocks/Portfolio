import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { getAuthProvider, WithFirebaseHocProps } from 'Shared/lib/firebase';

export interface HandlersProps {
  handleClick: () => void;
}

interface EnhancedProps {
  provider: string;
}

export default compose<WithFirebaseHocProps & HandlersProps, EnhancedProps>(
  withFirebase,
  withHandlers<EnhancedProps & WithFirebaseHocProps, HandlersProps>({

    handleClick: ({ firebase, provider }) => () => {
      firebase.auth().signInWithRedirect(getAuthProvider(provider));
    },

  }),
);
