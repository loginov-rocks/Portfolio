/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle, withState, withHandlers } from 'recompose';

import { fetchTokens, setAuthorizationToken } from '../../../actions/zenMoney';
import zenMoney from '../../../lib/ZenMoney/instance';

const mapStateToProps = ({ zenMoney: { accessToken } }) => ({ accessToken });

const mapDispatchToProps = { fetchTokens, setAuthorizationToken };

export default compose(
  withState('progress', 'updateProgress', false),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const {
        accessToken, fetchTokens, setAuthorizationToken, updateProgress,
      } = this.props;

      const code = zenMoney.extractAuthorizeCode(window.location);

      if (accessToken || code) {
        updateProgress(true);

        if (accessToken) {
          setAuthorizationToken(accessToken);
        } else {
          fetchTokens(code);
        }
      }
    },

    componentDidUpdate(prevProps) {
      const { accessToken, setAuthorizationToken, updateProgress } = this.props;

      if (accessToken && accessToken !== prevProps.accessToken) {
        updateProgress(true);
        setAuthorizationToken(accessToken);
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
