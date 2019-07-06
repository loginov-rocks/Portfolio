import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { deletePosition as deletePositionAction, DeletePositionAction } from 'Portfolio/actions';
import withPositionById from 'Portfolio/enhancers/withPositionById';
import { Position } from 'Portfolio/lib';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import withRouteParams from '../../enhancers/withRouteParams';
import { Props } from './Position';
import * as R from '../../routes';
import { RouteParamsState } from '../../State';

interface WithHandlersProps {
  deletePosition: DeletePositionAction;
  handleClosePositionClick: (positionId: string) => void;
  handleHomeClick: () => void;
  position: Position | null;
  positionLoading: boolean;
}

const mapDispatchToProps = { deletePosition: deletePositionAction };

export default compose<Props & WithHandlersProps, {}>(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
  }),
  withRouteParams,
  withPositionById<{ routeParams: RouteParamsState }>(({ routeParams }) => routeParams.position),
  withNavigationHandlers({
    handleCloseClick: ({ position }) => ({
      params: { position: position.id },
      route: R.CLOSE_POSITION,
    }),
  }),
  connect(null, mapDispatchToProps),
  withHandlers<WithHandlersProps, {}>({

    handleDeleteClick: ({
      deletePosition, handleHomeClick, position,
    }) => () => {
      if (position) {
        deletePosition(position.id)
          .then(() => handleHomeClick());
      }
    },

  }),
);
