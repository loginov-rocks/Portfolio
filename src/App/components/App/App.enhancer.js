/* @flow */

import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { branch, compose, withProps } from 'recompose';

import withStockQuotesUpdater from 'Stocks/enhancers/withStockQuotesUpdater';

const mapStateToProps = ({ firebase: { auth } }) => ({ auth });

export default compose(
  connect(mapStateToProps),
  withProps(({ auth }) => ({
    isAuthenticated: !isEmpty(auth) && isLoaded(auth),
    progress: !isLoaded(auth),
  })),
  branch(
    ({ isAuthenticated }) => isAuthenticated,
    withStockQuotesUpdater,
  ),
);
