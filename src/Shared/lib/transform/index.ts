export const firebaseCollectionToArray = <T>(object: { [key: string]: T }): (T & { id: string })[] => (
  Object.keys(object).map(id => ({
    ...object[id],
    id,
  }))
);
