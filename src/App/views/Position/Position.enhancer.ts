import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import withVibrantPaletteByImage from 'Firebase/enhancers/withVibrantPaletteByImage';
import { deletePosition as deletePositionAction, DeletePositionAction } from 'Portfolio/actions';
import withPositionById, { Props as WithPositionByIdProps } from 'Portfolio/enhancers/withPositionById';
import withStockLogoBySymbol, { Props as WithStockLogoBySymbolProps } from 'Stocks/enhancers/withStockLogoBySymbol';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import withRouteParams from '../../enhancers/withRouteParams';
import withStockPosition from '../../enhancers/withStockPosition';
import { Props } from './Position';
import * as R from '../../routes';
import { RouteParamsState } from '../../State';

interface WithNavigationHandlersProps {
  handleCloseClick: () => void;
  handleHomeClick: () => void;
  handleUpdateClick: () => void;
}

interface DispatchProps {
  deletePosition: DeletePositionAction;
}

interface WithStateHandlersProps {
  handleWantToDelete: () => void;
  wantToDelete: boolean;
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
    handleUpdateClick: ({ position }) => ({
      params: { position: position.id },
      route: R.UPDATE_POSITION,
    }),
  }),
  connect(null, mapDispatchToProps),
  withStateHandlers(
    { wantToDelete: false },
    { handleWantToDelete: () => () => ({ wantToDelete: true }) },
  ),
  withHandlers<WithNavigationHandlersProps & WithPositionByIdProps & DispatchProps & WithStateHandlersProps, {}>({

    handleDeleteClick: ({
      deletePosition, handleHomeClick, position, wantToDelete,
    }) => () => {
      if (position && wantToDelete) {
        deletePosition(position.id)
          .then(() => handleHomeClick());
      }
    },

  }),
  withStockPosition,
  withStockLogoBySymbol,
  withVibrantPaletteByImage<WithStockLogoBySymbolProps>(({ logo }) => logo),
);
