import { compose, withHandlers } from 'recompose';

import { Position } from 'Portfolio/lib/flow';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

interface NavigationProps {
  handleHomeClick: () => void;
  handlePositionClick: (position: Position) => void;
}

export interface Props extends NavigationProps {
  handleOnCreate: () => void;
}

export default compose<Props, {}>(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
    handlePositionClick: (props, position) => ({
      params: { position: position.id },
      route: R.POSITION,
    }),
  }),
  withHandlers<NavigationProps, {}>({

    handleOnCreate: ({ handlePositionClick }) => (position: Position) => {
      handlePositionClick(position);
    },

  }),
);
