import { compose } from 'recompose';

import withPositionsArray from 'Portfolio/enhancers/withPositionsArray';
import { Position } from 'Portfolio/lib/flow';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import * as R from '../../routes';

export interface Props {
  handleCreatePositionClick: () => void;
  handlePositionClick: (position: Position) => void;
  handleProfileClick: () => void;
  positions: Position[];
  positionsLoading: boolean;
}

export default compose<Props, {}>(
  withNavigationHandlers({
    handleCreatePositionClick: R.CREATE_POSITION,
    handlePositionClick: (props, position) => ({
      params: { position: position.id },
      route: R.POSITION,
    }),
    handleProfileClick: R.PROFILE,
  }),
  withPositionsArray,
);
