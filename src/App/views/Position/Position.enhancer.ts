import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { deletePosition } from 'Portfolio/actions';
import withPositionById from 'Portfolio/enhancers/withPositionById';

import withNavigationHandlers from '../../enhancers/withNavigationHandlers';
import withRouteParams from '../../enhancers/withRouteParams';
import * as R from '../../routes';

const mapDispatchToProps = { deletePosition };

export default compose(
  withNavigationHandlers({
    handleHomeClick: R.HOME,
  }),
  withRouteParams,
  withPositionById(({ routeParams }) => routeParams.position),
  connect(null, mapDispatchToProps),
  withHandlers({

    handleDeleteClick: ({
      deletePosition, handleHomeClick, position,
    }) => () => {
      deletePosition(position.id)
        .then(() => handleHomeClick());
    },

  }),
);
