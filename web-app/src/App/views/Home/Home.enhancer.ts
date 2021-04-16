import { connect } from 'react-redux';
import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import { changeHomeTab } from 'Layers/Application/ActionCreators/HomeActionCreators/HomeActionCreators';
import withPositions from 'Portfolio/enhancers/withPositions';
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
  withPositions,
  withStockPositions,
);
