/* @flow */

import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

export default compose(
  withFirebase,
  withHandlers({

    handleClick: ({ firebase }) => () => {
      firebase.logout();
    },

  }),
);
