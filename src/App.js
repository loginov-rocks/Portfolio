/* @flow */

import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { fetchDiff } from './actions';
import AccountsList from './components/AccountsList';
import Authorize from './components/Authorize';
import LogoutButton from './components/LogoutButton';
import Portfolio from './components/Porfolio';
import withAuth from './enhancers/withAuth';
import withStockQuotesUpdater from './enhancers/withStockQuotesUpdater';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchDiff();
  }

  render() {
    return (
      <React.Fragment>
        <AccountsList />
        <Portfolio />
        <LogoutButton />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ diff }) => ({ diff });

const mapDispatchToProps = { fetchDiff };

export default compose(
  withAuth(Authorize),
  withStockQuotesUpdater,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
