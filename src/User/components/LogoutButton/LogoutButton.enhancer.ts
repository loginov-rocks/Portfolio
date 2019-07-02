import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { WithFirebaseHocProps } from 'Firebase/lib';

export interface HandlersProps {
  handleClick: () => void;
}

export default compose<WithFirebaseHocProps & HandlersProps, {}>(
  withFirebase,
  withHandlers<WithFirebaseHocProps, HandlersProps>({

    handleClick: ({ firebase }) => () => {
      firebase.auth().signOut();
    },

  }),
);
