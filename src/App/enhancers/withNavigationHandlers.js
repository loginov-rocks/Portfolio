/* @flow */

import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { navigate } from '../actions';

const mapDispatchToProps = { navigate };

const withNavigationHandlers = (handlersMapper) => compose(
  connect(null, mapDispatchToProps),
  withHandlers(() => {
    const handlers = {};

    Object.keys(handlersMapper).forEach((key) => {
      handlers[key] = ({ navigate: dispatchNavigate }) => () => {
        dispatchNavigate(handlersMapper[key]);
      };
    });

    return handlers;
  }),
);

export default withNavigationHandlers;
