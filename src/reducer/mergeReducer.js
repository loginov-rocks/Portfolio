/* @flow */

import _ from 'lodash';

export default (initialState, persistedState) => _.merge(
  {},
  initialState,
  persistedState,
  {
    zenMoney: {
      isAuthorized: false,
    },
  },
);
