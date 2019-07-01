import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { deletePosition as deletePositionAction } from 'Portfolio/actions';
import withPositionById from 'Portfolio/enhancers/withPositionById';
import { Position } from 'Portfolio/lib/flow';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import withRouteParams from '../../enhancers/withRouteParams';
import * as R from '../../routes';

interface NavigationProps {
  handleHomeClick: () => void;
}

interface RouteParamsProps {
  position: Position;
}

interface DispatchProps {
  deletePosition: (id: string) => Promise<void>;
}

export interface Props extends NavigationProps, RouteParamsProps {
  handleDeleteClick: () => void;
  positionLoading: boolean;
}

const mapDispatchToProps = { deletePosition: deletePositionAction };

export default compose<Props, {}>(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
  }),
  withRouteParams,
  withPositionById(({ routeParams }) => routeParams.position),
  connect(null, mapDispatchToProps),
  withHandlers<NavigationProps & RouteParamsProps & DispatchProps, {}>({

    handleDeleteClick: ({
      deletePosition, handleHomeClick, position,
    }) => () => {
      deletePosition(position.id)
        .then(() => handleHomeClick());
    },

  }),
);
