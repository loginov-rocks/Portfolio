import { connect } from 'react-redux';
import {
  compose, lifecycle, withState, withHandlers,
} from 'recompose';

import { fetchTokens as fetchTokensAction, setAccessToken as setAccessTokenAction } from '../../actions';
import zenMoney from '../../lib/ZenMoney/instance';
import ZenMoney from '../../lib/ZenMoney/ZenMoney';

interface Props {
  accessToken: string;
  fetchTokens: (code: string) => void;
  setAccessToken: (accessToken: string) => void;
  updateProgress: (progress: boolean) => void;
}

const mapStateToProps = ({ zenMoney: { accessToken } }): { accessToken: string } => ({ accessToken });

const mapDispatchToProps = { fetchTokens: fetchTokensAction, setAccessToken: setAccessTokenAction };

export default compose(
  withState('progress', 'updateProgress', false),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<Props, {}>({

    componentDidMount() {
      const {
        accessToken, fetchTokens, setAccessToken, updateProgress,
      } = this.props;

      const code = ZenMoney.extractAuthorizeCode(window.location);

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
      (window as any).location = zenMoney.getAuthorizeUrl();
    },

  }),
);
