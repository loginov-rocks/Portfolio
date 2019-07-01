import { connect } from 'react-redux';
import { compose, HandleCreators, withHandlers } from 'recompose';

import { navigate as navigateAction } from '../actions';
import { Route } from '../routes';

/**
 * Function returning route and params based on component props and event passed when handler triggered.
 */
interface RouteMapper {
  (props: { [key: string]: any }, event: any): {
    route: Route;
    params?: {
      [key: string]: any;
    };
  };
}

/**
 * Map containing handlers names as key and route or function returning route and params as a value.
 */
interface NavigationHandlersMapper {
  [key: string]: Route | RouteMapper;
}

const mapDispatchToProps = { navigate: navigateAction };

export default <TInner, TOutter>(handlersMapper: NavigationHandlersMapper) => compose<TInner, TOutter>(
  // Connect to get navigate action.
  connect(null, mapDispatchToProps),
  // Add handlers using recompose.
  withHandlers(() => {
    const handlers: HandleCreators<{ navigate: typeof navigateAction }, {}> = {};

    // Iterate over mapper to compose object which is consumed by withHandlers higher order component.
    Object.keys(handlersMapper).forEach(key => {
      // Each handler has props as an argument of the first function and event passed when handler triggered as an
      // argument of the second function.
      handlers[key] = ({ navigate, ...props }) => (event: any) => {
        if (typeof handlersMapper[key] === 'function') {
          // If element is a function, then it is a RouteMapper.
          const { params, route } = (handlersMapper[key] as RouteMapper)(props, event);
          navigate(route, params);
        } else {
          // Otherwise it is a Route.
          const route = (handlersMapper[key] as Route);
          navigate(route);
        }
      };
    });

    return handlers;
  }),
);
