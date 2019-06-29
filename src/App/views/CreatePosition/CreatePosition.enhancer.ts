/* @flow */

import { compose, withHandlers, type HOC } from 'recompose';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

const enhancer: HOC<*, *> = compose(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
    handlePositionClick: (props, position) => ({
      params: { position: position.id },
      route: R.POSITION,
    }),
  }),
  withHandlers({

    handleOnCreate: ({ handlePositionClick }) => (position) => {
      handlePositionClick(position);
    },

  }),
);

export default enhancer;
