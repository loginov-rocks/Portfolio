/* @flow */

import { connect } from 'react-redux';
import { compose, withHandlers, type HOC } from 'recompose';

import { navigate } from '../actions';

type HandlersMapper = {
  [string]: string | ({}, any) => { params: {}, route: string },
};

const mapDispatchToProps = { navigate };

const withNavigationHandlers: HOC<*, *> = (
  handlersMapper: HandlersMapper,
) => compose(
  connect(null, mapDispatchToProps),
  withHandlers(() => {
    const handlers = {};

    Object.keys(handlersMapper).forEach((key) => {
      handlers[key] = ({ navigate: dispatchNavigate, ...props }) => (event) => {
        if (typeof handlersMapper[key] === 'function') {
          const { params, route } = handlersMapper[key](props, event);
          dispatchNavigate(route, params);
        } else {
          const route = handlersMapper[key];
          dispatchNavigate(route);
        }
      };
    });

    return handlers;
  }),
);

export default withNavigationHandlers;
