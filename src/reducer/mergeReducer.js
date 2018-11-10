/* @flow */

import _ from 'lodash';

export default (initialState, persistedState) => {
  return _.assign({}, initialState, persistedState, { isAuthorized: false });
};
