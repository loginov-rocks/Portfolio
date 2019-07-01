import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { branch, compose, withProps } from 'recompose';

import withStockQuotesUpdater from 'Stocks/enhancers/withStockQuotesUpdater';

import { State } from '../../../reducer';

interface StateProps {
  auth: any;
}

export interface WithProps {
  isAuthenticated: boolean;
  progress: boolean;
}

const mapStateToProps = ({ firebase: { auth } }: State): StateProps => ({ auth });

export default compose<StateProps & WithProps, {}>(
  connect<StateProps, {}, {}, State>(mapStateToProps),
  withProps<WithProps, StateProps>(({ auth }) => ({
    isAuthenticated: !isEmpty(auth) && isLoaded(auth),
    progress: !isLoaded(auth),
  })),
  branch<StateProps & WithProps>(
    ({ isAuthenticated }) => isAuthenticated,
    withStockQuotesUpdater,
  ),
);
