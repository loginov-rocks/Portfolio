import { connect } from 'react-redux';
import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import { PositionsConnector } from 'Layers/Adapter/Connectors/PositionsConnector/PositionsConnector';
import {
  PositionsFirestoreConnector,
} from 'Layers/Adapter/FirestoreConnectors/PositionsFirestoreConnector/PositionsFirestoreConnector';
import { changeHomeTab } from 'Layers/Application/ActionCreators/HomeActionCreators/HomeActionCreators';
import State from 'State';

import withStockPositions from '../../enhancers/withStockPositions';
import { Props } from './Home';
import * as R from '../../routes';

interface StateProps {
  tab: 'closed' | 'open' | 'summary';
}

interface WithHandlersProps {
  handlePositionClick: (positionId: string) => void;
}

const mapStateToProps = ({ home: { homeTab } }: State): StateProps => ({ tab: homeTab });

const mapDispatchToProps = { handleTabChange: changeHomeTab };

export default compose<Props, Record<string, never>>(
  withRouter,
  withHandlers<WithRouterProps, WithHandlersProps>({

    handlePositionClick: ({ history }) => (positionId: string) => {
      history.push(R.toPosition(positionId));
    },

  }),
  connect(mapStateToProps, mapDispatchToProps),
  PositionsFirestoreConnector,
  PositionsConnector,
  withStockPositions,
);
