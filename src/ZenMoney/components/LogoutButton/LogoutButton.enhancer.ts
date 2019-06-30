import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { logout as logoutAction } from '../../actions';

const mapDispatchToProps = { logout: logoutAction };

export default compose(
  connect(null, mapDispatchToProps),
  withHandlers({

    handleClick: ({ logout }) => () => {
      logout();
    },

  }),
);
