import { compose, withHandlers } from 'recompose';

import { Position } from 'Portfolio/lib';

import { Props } from './CreatePosition';
import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

interface WithNavigationHandlersProps {
  handlePositionClick: (positionId: string) => void;
}

export default compose<Props, {}>(
  withNavigationHandlers({
    handlePositionClick: (props, positionId) => ({
      params: { position: positionId },
      route: R.POSITION,
    }),
  }),
  withHandlers<WithNavigationHandlersProps, {}>({

    handleCreate: ({ handlePositionClick }) => (position: Position) => {
      handlePositionClick(position.id);
    },

  }),
);
