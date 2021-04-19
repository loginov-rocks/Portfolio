import { connect } from 'react-redux';
import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import {
  PositionByIdConnector, PositionByIdConnectorProps,
} from 'Layers/Adapter/Connectors/PositionByIdConnector/PositionByIdConnector';
import {
  PositionsFirestoreConnector,
} from 'Layers/Adapter/FirestoreConnectors/PositionsFirestoreConnector/PositionsFirestoreConnector';
import {
  deletePosition as deletePositionAction, DeletePositionAction,
} from 'Layers/Application/ActionCreators/PortfolioActionCreators/PortfolioActionCreators';
import {
  StockLogoBySymbolMiddleware, StockLogoBySymbolMiddlewareProps,
} from 'Layers/Behavior/Middlewares/StockLogoBySymbolMiddleware/StockLogoBySymbolMiddleware';
import {
  VibrantPaletteByImageMiddleware,
} from 'Layers/Behavior/Middlewares/VibrantPaletteByImageMiddleware/VibrantPaletteByImageMiddleware';

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

type WithHandlersOutter = WithRouterProps & PositionByIdConnectorProps & DispatchProps & WithStateHandlersProps;

export default compose<Props, Record<string, never>>(
  withRouter,
  PositionsFirestoreConnector,
  PositionByIdConnector<WithRouterProps<{ id: string }>>(({ match: { params: { id } } }) => id),
  connect(null, mapDispatchToProps),
  withStateHandlers(
    { wantToDelete: false },
    { handleWantToDelete: () => () => ({ wantToDelete: true }) },
  ),
  withHandlers<WithHandlersOutter, WithHandlersProps>({

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
  StockLogoBySymbolMiddleware(),
  VibrantPaletteByImageMiddleware<StockLogoBySymbolMiddlewareProps>(({ logo }) => logo),
);
