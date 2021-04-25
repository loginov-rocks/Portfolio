import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import {
  PositionByIdConnector, PositionByIdConnectorProps,
} from 'Layers/Adapter/Connectors/PositionByIdConnector/PositionByIdConnector';
import {
  PositionsOperationsConnector, PositionsOperationsConnectorProps,
} from 'Layers/Adapter/Connectors/PositionsOperationsConnector/PositionsOperationsConnector';
import {
  PositionsFirestoreConnector,
} from 'Layers/Adapter/FirestoreConnectors/PositionsFirestoreConnector/PositionsFirestoreConnector';
import {
  StockLogoBySymbolMiddleware, StockLogoBySymbolMiddlewareProps,
} from 'Layers/Behavior/Middlewares/StockLogoBySymbolMiddleware/StockLogoBySymbolMiddleware';
import {
  VibrantPaletteByImageMiddleware,
} from 'Layers/Behavior/Middlewares/VibrantPaletteByImageMiddleware/VibrantPaletteByImageMiddleware';

import withStockPosition from '../../enhancers/withStockPosition';
import { Props } from './Position';
import * as R from '../../routes';

interface WithStateHandlersProps {
  handleWantToDelete: () => void;
  wantToDelete: boolean;
}

interface WithHandlersProps {
  handleCloseClick: () => void;
  handleDeleteClick: () => void;
  handleUpdateClick: () => void;
}

type WithHandlersOutterProps = WithRouterProps & PositionByIdConnectorProps & PositionsOperationsConnectorProps
  & WithStateHandlersProps;

export default compose<Props, Record<string, never>>(
  withRouter,
  PositionsFirestoreConnector,
  PositionByIdConnector<WithRouterProps<{ id: string }>>(({ match: { params: { id } } }) => id),
  PositionsOperationsConnector,
  withStateHandlers(
    { wantToDelete: false },
    { handleWantToDelete: () => () => ({ wantToDelete: true }) },
  ),
  withHandlers<WithHandlersOutterProps, WithHandlersProps>({

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
