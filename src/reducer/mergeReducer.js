/* @flow */

import _ from 'lodash';

export default (initialState, persistedState) => {
  const state = _.assign({}, initialState, persistedState);

  state.zenMoney.isAuthorized = false;

  return state;
};
