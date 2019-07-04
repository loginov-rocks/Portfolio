export const areArraysEqual = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = a.sort();
  const sortedB = b.sort();

  return sortedA.every((value, index) => value === sortedB[index]);
};

export const firebaseCollectionToArray = <T>(object: { [key: string]: T }): (T & { id: string })[] => (
  Object.keys(object).map(id => ({
    ...object[id],
    id,
  }))
);
