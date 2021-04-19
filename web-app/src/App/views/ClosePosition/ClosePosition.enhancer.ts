import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import {
  PositionByIdConnector, PositionByIdConnectorProps,
} from 'Layers/Adapter/Connectors/PositionByIdConnector/PositionByIdConnector';
import {
  PositionsFirestoreConnector,
} from 'Layers/Adapter/FirestoreConnectors/PositionsFirestoreConnector/PositionsFirestoreConnector';

import { Props } from './ClosePosition';
import * as R from '../../routes';

interface WithHandlersProps {
  handleBackClick: () => void;
}

export default compose<Props, Record<string, never>>(
  withRouter,
  PositionsFirestoreConnector,
  PositionByIdConnector<WithRouterProps<{ id: string }>>(({ match: { params: { id } } }) => id),
  withHandlers<WithRouterProps & PositionByIdConnectorProps, WithHandlersProps>({

    handleBackClick: ({ history, position }) => () => {
      if (position) {
        history.push(R.toPosition(position.id));
      }
    },

  }),
);
