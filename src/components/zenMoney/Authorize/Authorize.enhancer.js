/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle, withState, withHandlers } from 'recompose';

import { fetchTokens, setAccessToken } from '../../../actions/zenMoney';
import zenMoney from '../../../lib/ZenMoney/instance';

const mapStateToProps = ({ zenMoney: { accessToken } }) => ({ accessToken });

const mapDispatchToProps = { fetchTokens, setAccessToken };

export default compose(
  withState('progress', 'updateProgress', false),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const {
        accessToken, fetchTokens, setAccessToken, updateProgress,
      } = this.props;

      const code = zenMoney.extractAuthorizeCode(window.location);

      if (accessToken || code) {
        updateProgress(true);

        if (accessToken) {
          setAccessToken(accessToken);
        } else {
          fetchTokens(code);
        }
      }
    },

    componentDidUpdate(prevProps) {
      const { accessToken, setAccessToken, updateProgress } = this.props;

      if (accessToken && accessToken !== prevProps.accessToken) {
        updateProgress(true);
        setAccessToken(accessToken);
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
