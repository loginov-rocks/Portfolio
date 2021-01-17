import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import withPositionById, { Props as WithPositionByIdProps } from 'Portfolio/enhancers/withPositionById';

import * as R from '../../routes';
import { Props } from './UpdatePosition';

interface WithHandlersProps {
  handleBackClick: () => void;
}

export default compose<Props, Record<string, never>>(
  withRouter,
  withPositionById<WithRouterProps<{ id: string }>>(({ match: { params: { id } } }) => id),
  withHandlers<WithRouterProps & WithPositionByIdProps, WithHandlersProps>({

    handleBackClick: ({ history, position }) => () => {
      if (position) {
        history.push(R.toPosition(position.id));
      }
    },

  }),
);
