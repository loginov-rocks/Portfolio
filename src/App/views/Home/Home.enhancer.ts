import { compose, withStateHandlers } from 'recompose';

import withPositions from 'Portfolio/enhancers/withPositions';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import { Props } from './Home';
import * as R from '../../routes';

export default compose<Props, {}>(
  withNavigationHandlers({
    handlePositionClick: (props, positionId) => ({
      params: { position: positionId },
      route: R.POSITION,
    }),
  }),
  withPositions,
  withStateHandlers(
    { tab: 0 },
    { handleTabChange: () => (event: React.ChangeEvent<{}>, tab: number) => ({ tab }) },
  ),
);
