/* @flow */

import { compose, withHandlers, type HOC } from 'recompose';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

const enhancer: HOC<*, *> = compose(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
  }),
  withHandlers({

    handleOnCreate: ({ handleHomeClick }) => () => {
      handleHomeClick();
    },

  }),
);

export default enhancer;
