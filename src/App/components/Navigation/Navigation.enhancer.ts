import { connect } from 'react-redux';

import State from 'State';

import { Route } from '../../routes';

export interface StateProps {
  route: Route;
}

const mapStateToProps = ({ app: { route } }: State): StateProps => ({ route });

export default connect<StateProps, {}, {}, State>(mapStateToProps);
