import { RouteComponentProps as WithRouterProps, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import withPositionById, { Props as WithPositionByIdProps } from 'Portfolio/enhancers/withPositionById';

import { Props } from './ClosePosition';
import * as R from '../../routes';

export default compose<Props, {}>(
  withRouter,
  withPositionById<WithRouterProps<{ id: string }>>(({ match: { params: { id } } }) => id),
  withHandlers<WithRouterProps & WithPositionByIdProps, {}>({

    handleBackClick: ({ history, position }) => () => {
      if (position) {
        history.push(R.toPosition(position.id));
      }
    },

  }),
);
