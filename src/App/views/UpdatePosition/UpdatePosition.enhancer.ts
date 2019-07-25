import { compose, withHandlers } from 'recompose';

import withPositionById, { Props as WithPositionByIdProps } from 'Portfolio/enhancers/withPositionById';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import withRouteParams from '../../enhancers/withRouteParams';
import * as R from '../../routes';
import { RouteParamsState } from '../../State';
import { Props } from './UpdatePosition';

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
  withRouteParams,
  withPositionById<{ routeParams: RouteParamsState }>(({ routeParams }) => routeParams.position),
  withHandlers<WithNavigationHandlersProps & WithPositionByIdProps, {}>({

    handleBackClick: ({ handlePositionClick, position }) => () => {
      if (position) {
        handlePositionClick(position.id);
      }
    },

  }),
);
