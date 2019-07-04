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

export default compose<Props & StateProps, {}>(
  connect(mapStateToProps),
  withProps<Props, StateProps>(({ auth }) => ({
    isAuthenticated: !isEmpty(auth) && isLoaded(auth),
    progress: !isLoaded(auth),
  })),
  branch<Props & StateProps>(
    ({ isAuthenticated }) => isAuthenticated,
    withStockQuotesUpdater,
  ),
);
