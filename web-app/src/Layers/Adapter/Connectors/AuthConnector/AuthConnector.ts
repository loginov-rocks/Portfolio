import { connect, ConnectedProps } from 'react-redux';

import { triggerLogout, triggerSignIn } from 'Layers/Application/ActionCreators/AuthActionCreators/AuthActionCreators';
import { AuthState } from 'Layers/Application/States/FirebaseState/FirebaseState';
import State from 'State';

interface StateProps {
  auth: AuthState;
}

const mapStateToProps = ({ firebase: { firebase: { auth } } }: State): StateProps => ({ auth });

const mapDispatchToProps = { triggerLogout, triggerSignIn };

export const AuthConnector = connect(mapStateToProps, mapDispatchToProps);

export type AuthConnectorProps = ConnectedProps<typeof AuthConnector>;
