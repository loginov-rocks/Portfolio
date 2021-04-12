import { connect } from 'react-redux';

import { AuthState } from 'Firebase/State';
import State from 'State';

export interface AppConnectorProps {
  auth: AuthState;
}

const mapStateToProps = ({ firebase: { firebase: { auth } } }: State): AppConnectorProps => ({ auth });

export const AppConnector = connect(mapStateToProps);
