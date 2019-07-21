import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';

import State from 'State';

import { navigate, NavigateAction } from '../../actions';
import { Props } from './Navigation';
import * as R from '../../routes';

interface StateProps {
  route: R.Route;
}

interface DispatchProps {
  navigate: NavigateAction;
}

interface WithProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const mapStateToProps = ({ app: { route } }: State): StateProps => ({ route });

const mapDispatchToProps = { navigate };

const containerRef = React.createRef();

export default compose<Props, {}>(
  connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps),
  withProps(() => ({ containerRef })),
  lifecycle<StateProps & DispatchProps & WithProps, {}>({

    componentDidUpdate(prevProps) {
      const { current } = this.props.containerRef;

      // Scroll container to the top when route changes.
      if (this.props.route !== prevProps.route && current && current.scrollTop > 0) {
        current.scrollTo(0, 0);
      }
    },

  }),
);
