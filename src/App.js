import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { fetchDiff } from './actions';
import './App.css';
import AccountsList from './components/AccountsList';
import Authorize from './components/Authorize';
import withAuth from './enhancers/withAuth';
import logo from './logo.svg';

class App extends Component {
  componentDidMount() {
    this.props.fetchDiff();
  }

  render() {
    return (
      <div className="App">
        <AccountsList />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ diff }) => ({ diff });

const mapDispatchToProps = {
  fetchDiff,
};

export default compose(
  withAuth(Authorize),
  connect(mapStateToProps, mapDispatchToProps),
)(App);
