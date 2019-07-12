import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { deletePosition as deletePositionAction, DeletePositionAction } from 'Portfolio/actions';
import withPositionById, { Props as WithPositionByIdProps } from 'Portfolio/enhancers/withPositionById';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import withRouteParams from '../../enhancers/withRouteParams';
import withStockPosition from '../../enhancers/withStockPosition';
import { Props } from './Position';
import * as R from '../../routes';
import { RouteParamsState } from '../../State';

interface WithNavigationHandlersProps {
  handleCloseClick: () => void;
  handleHomeClick: () => void;
}

interface DispatchProps {
  deletePosition: DeletePositionAction;
}

const mapDispatchToProps = { deletePosition: deletePositionAction };

export default compose<Props, {}>(
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
  withHandlers<WithNavigationHandlersProps & WithPositionByIdProps & DispatchProps, {}>({

    handleDeleteClick: ({ deletePosition, handleHomeClick, position }) => () => {
      if (position) {
        deletePosition(position.id)
          .then(() => handleHomeClick());
      }
    },

  }),
  withStockPosition,
);
