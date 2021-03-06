import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import { Position } from 'Portfolio/lib';

import { Props } from './CreatePosition';
import * as R from '../../routes';

interface WithHandlersProps {
  handleCreate: (position: Position) => void;
}

export default compose<Props, Record<string, never>>(
  withRouter,
  withHandlers<WithRouterProps, WithHandlersProps>({

    handleCreate: ({ history }) => (position: Position) => {
      history.push(R.toPosition(position.id));
    },

  }),
);
