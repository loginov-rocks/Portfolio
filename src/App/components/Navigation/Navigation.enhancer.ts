import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose, lifecycle, withProps } from 'recompose';

import { Props } from './Navigation';
import * as R from '../../routes';

interface WithProps {
  containerRef: React.RefObject<HTMLDivElement>;
  currentRoute: R.Route;
}

const containerRef = React.createRef();

export default compose<Props, {}>(
  withRouter,
  withProps<{}, RouteComponentProps>(({ location }) => ({
    containerRef,
    currentRoute: location.pathname,
  })),
  lifecycle<RouteComponentProps & WithProps, {}>({

    componentDidUpdate(prevProps) {
      const { current } = this.props.containerRef;

      // Scroll container to the top when route changes.
      if (this.props.currentRoute !== prevProps.currentRoute && current && current.scrollTop > 0) {
        current.scrollTo(0, 0);
      }
    },

  }),
);
