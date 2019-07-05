import { compose, withHandlers } from 'recompose';

import { Position } from 'Portfolio/lib';

import { Props } from './CreatePosition';
import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

interface WithHandlersProps {
  handlePositionClick: (position: Position) => void;
}

export default compose<Props & WithHandlersProps, {}>(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
    handlePositionClick: (props, position) => ({
      params: { position: position.id },
      route: R.POSITION,
    }),
  }),
  withHandlers<WithHandlersProps, {}>({

    handleCreate: ({ handlePositionClick }) => (position: Position) => {
      handlePositionClick(position);
    },

  }),
);
