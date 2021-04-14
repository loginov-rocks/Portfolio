import { connect } from 'react-redux';
import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import withVibrantPaletteByImage from 'Firebase/enhancers/withVibrantPaletteByImage';
import {
  deletePosition as deletePositionAction, DeletePositionAction,
} from 'Layers/Application/ActionCreators/PortfolioActionCreators/PortfolioActionCreators';
import {
  StockLogoBySymbolEnhancer, StockLogoBySymbolEnhancerProps,
} from 'Layers/Behavior/Enhancers/StockLogoBySymbolEnhancer/StockLogoBySymbolEnhancer';
import withPositionById, { Props as WithPositionByIdProps } from 'Portfolio/enhancers/withPositionById';

import withStockPosition from '../../enhancers/withStockPosition';
import { Props } from './Position';
import * as R from '../../routes';

interface DispatchProps {
  deletePosition: DeletePositionAction;
}

interface WithStateHandlersProps {
  handleWantToDelete: () => void;
  wantToDelete: boolean;
}

interface WithHandlersProps {
  handleCloseClick: () => void;
  handleDeleteClick: () => void;
  handleUpdateClick: () => void;
}

const mapDispatchToProps = { deletePosition: deletePositionAction };

export default compose<Props, Record<string, never>>(
  withRouter,
  withPositionById<WithRouterProps<{ id: string }>>(({ match: { params: { id } } }) => id),
  connect(null, mapDispatchToProps),
  withStateHandlers(
    { wantToDelete: false },
    { handleWantToDelete: () => () => ({ wantToDelete: true }) },
  ),
  withHandlers<WithRouterProps & WithPositionByIdProps & DispatchProps & WithStateHandlersProps, WithHandlersProps>({

    handleCloseClick: ({ history, position }) => () => {
      if (position) {
        history.push(R.toClosePosition(position.id));
      }
    },

    handleDeleteClick: ({
      deletePosition, history, position, wantToDelete,
    }) => () => {
      if (position && wantToDelete) {
        deletePosition(position.id)
          .then(() => history.push(R.HOME));
      }
    },

    handleUpdateClick: ({ history, position }) => () => {
      if (position) {
        history.push(R.toUpdatePosition(position.id));
      }
    },

  }),
  withStockPosition,
  StockLogoBySymbolEnhancer(),
  withVibrantPaletteByImage<StockLogoBySymbolEnhancerProps>(({ logo }) => logo),
);
