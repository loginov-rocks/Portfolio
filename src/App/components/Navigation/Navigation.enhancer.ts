import { connect } from 'react-redux';

import State from 'State';

import { navigate, NavigateAction } from '../../actions';
import * as R from '../../routes';

interface StateProps {
  route: R.Route;
}

interface DispatchProps {
  navigate: NavigateAction;
}

const mapStateToProps = ({ app: { route } }: State): StateProps => ({ route });

const mapDispatchToProps = { navigate };

export default connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps);
