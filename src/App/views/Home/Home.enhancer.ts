import { compose } from 'recompose';

import withPositions from 'Portfolio/enhancers/withPositions';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import { Props } from './Home';
import * as R from '../../routes';

export default compose<Props, {}>(
  withNavigationHandlers({
    handlePositionClick: (props, position) => ({
      params: { position: position.id },
      route: R.POSITION,
    }),
  }),
  withPositions,
);
