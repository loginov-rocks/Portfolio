import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import { Position } from 'Portfolio/lib';

import { Props } from './CreatePosition';
import * as R from '../../routes';

export default compose<Props, {}>(
  withRouter,
  withHandlers<WithRouterProps, {}>({

    handleCreate: ({ history }) => (position: Position) => {
      history.push(R.toPosition(position.id));
    },

  }),
);
