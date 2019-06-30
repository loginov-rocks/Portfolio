import { compose, withHandlers } from 'recompose';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

export default compose(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
    handlePositionClick: (props, position) => ({
      params: { position: position.id },
      route: R.POSITION,
    }),
  }),
  withHandlers({

    handleOnCreate: ({ handlePositionClick }) => position => {
      handlePositionClick(position);
    },

  }),
);
