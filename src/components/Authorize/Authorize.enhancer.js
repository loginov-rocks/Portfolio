/* @flow */

import { compose, withHandlers } from 'recompose';

import zenMoney from '../../lib/ZenMoney/instance';

export default compose(
  withHandlers({

    handleAuthorize: () => () => {
      window.location = zenMoney.getAuthorizeUrl();
    },

  }),
);
