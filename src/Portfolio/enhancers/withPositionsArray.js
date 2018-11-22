/* @flow */

import withPositions from './withPositions';

export default withPositions(object => {
  return Object.keys(object).map(id => ({
    ...object[id],
    id,
  }));
});
