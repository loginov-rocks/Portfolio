import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { branch, compose, withProps } from 'recompose';

import { AuthState } from 'Firebase/State';
import withStockQuotesUpdater from 'Stocks/enhancers/withStockQuotesUpdater';
import State from 'State';

import { Props } from './App';

interface StateProps {
  auth: AuthState;
}

const mapStateToProps = ({ firebase: { firebase: { auth } } }: State): StateProps => ({ auth });

export default compose<StateProps & Props, {}>(
  connect(mapStateToProps),
  withProps<Props, StateProps>(({ auth }) => ({
    isAuthenticated: !isEmpty(auth) && isLoaded(auth),
    progress: !isLoaded(auth),
  })),
  branch<StateProps & Props>(
    ({ isAuthenticated }) => isAuthenticated,
    withStockQuotesUpdater,
  ),
);
