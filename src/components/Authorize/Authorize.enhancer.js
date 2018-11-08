/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle, withState, withHandlers } from 'recompose';

import { fetchTokens } from '../../actions';
import zenMoney from '../../lib/ZenMoney/instance';

const mapDispatchToProps = {
  fetchTokens,
};

export default compose(
  withState('progress', 'updateProgress', false),
  connect(null, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const code = zenMoney.extractAuthorizeCode(window.location);

      if (code) {
        this.props.updateProgress(true);
        this.props.fetchTokens(code);
      }
    },

  }),
  withHandlers({

    handleAuthorize: ({ updateProgress }) => () => {
      updateProgress(true);
      window.location = zenMoney.getAuthorizeUrl();
    },

  }),
);
