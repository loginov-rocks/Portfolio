import { compose, withHandlers } from 'recompose';

import withPositionById, { Props as WithPositionByIdProps } from 'Portfolio/enhancers/withPositionById';
import { Position } from 'Portfolio/lib';

import { Props } from './ClosePosition';
import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import withRouteParams from '../../enhancers/withRouteParams';
import * as R from '../../routes';
import { RouteParamsState } from '../../State';

interface WithNavigationHandlersProps {
  handlePositionClick: (position: Position) => void;
}

export default compose<Props, {}>(
  withNavigationHandlers({
    handlePositionClick: (props, position) => ({
      params: { position: position.id },
      route: R.POSITION,
    }),
  }),
  withRouteParams,
  withPositionById<{ routeParams: RouteParamsState }>(({ routeParams }) => routeParams.position),
  withHandlers<WithNavigationHandlersProps & WithPositionByIdProps, {}>({

    handleBackClick: ({ handlePositionClick, position }) => () => {
      if (position) {
        handlePositionClick(position);
      }
    },

  }),
);
