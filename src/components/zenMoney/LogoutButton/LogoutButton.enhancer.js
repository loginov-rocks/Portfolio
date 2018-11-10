/* @flow */

import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { logout } from '../../../actions/zenMoney';

const mapDispatchToProps = { logout };

export default compose(
  connect(null, mapDispatchToProps),
  withHandlers({

    handleClick: ({ logout }) => () => {
      logout();
    },

  }),
);