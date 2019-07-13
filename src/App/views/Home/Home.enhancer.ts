import { connect } from 'react-redux';
import { compose } from 'recompose';

import withPositions from 'Portfolio/enhancers/withPositions';
import State from 'State';

import { changeHomeTab } from '../../actions';
import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import { Props } from './Home';
import * as R from '../../routes';

interface StateProps {
  tab: 'closed' | 'open' | 'summary';
}

const mapStateToProps = ({ app: { homeTab } }: State): StateProps => ({ tab: homeTab });

const mapDispatchToProps = { handleTabChange: changeHomeTab };

export default compose<Props, {}>(
  withNavigationHandlers({
    handlePositionClick: (props, positionId) => ({
      params: { position: positionId },
      route: R.POSITION,
    }),
  }),
  withPositions,
  connect(mapStateToProps, mapDispatchToProps),
);
