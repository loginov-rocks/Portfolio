/* @flow */

export const firebaseCollectionToArray = (object: {}) => (
  Object.keys(object).map(id => ({
    ...object[id],
    id,
  }))
);
