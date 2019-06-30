export const firebaseCollectionToArray = <T>(object: { [index: string]: T }): (T & { id: string })[] => (
  Object.keys(object).map(id => ({
    ...object[id],
    id,
  }))
);
