import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { navigate } from '../actions';

interface Handler {
  (props: {}, event: any): { params: {}; route: string };
}

interface HandlersMapper {
  [key: string]: Handler | string;
}

const mapDispatchToProps = { navigate };

export default (handlersMapper: HandlersMapper) => compose(
  connect(null, mapDispatchToProps),
  withHandlers(() => {
    const handlers = {};

    Object.keys(handlersMapper).forEach(key => {
      handlers[key] = ({ navigate: dispatchNavigate, ...props }) => event => {
        if (typeof handlersMapper[key] === 'function') {
          const { params, route } = (handlersMapper[key] as Handler)(props, event);
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
