/* @flow */

import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { deletePosition } from '../../actions';

const mapDispatchToProps = { deletePosition };

export default compose(
  connect(null, mapDispatchToProps),
  withHandlers({

    handleDelete: ({ deletePosition, position }) => () => {
      deletePosition(position.id);
    },

  }),
);
