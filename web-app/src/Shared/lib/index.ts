// TODO: Tests.

export const areArraysEqual = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = a.sort();
  const sortedB = b.sort();

  return sortedA.every((value, index) => value === sortedB[index]);
};

export const compareProperties = <T>(a: T, b: T): number => {
  if (a === undefined || b === undefined) {
    if (a === undefined && b !== undefined) {
      return -1;
    }

    if (a !== undefined && b === undefined) {
      return 1;
    }

    return 0;
  }

  if (a === null || b === null) {
    if (a === null && b !== null) {
      return -1;
    }

    if (a !== null && b === null) {
      return 1;
    }

    return 0;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  throw new Error('Unknown properties types');
};

export const firebaseCollectionToArray = <T>(object: { [key: string]: T }): (T & { id: string })[] => (
  Object.keys(object).map((id) => ({
    ...object[id],
    id,
  }))
);

export const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

export const sortCollection = <T>(collection: T[], key: keyof T, order: 'asc' | 'desc'): T[] => collection.sort(
  ({ [key]: a }, { [key]: b }) => {
    const result = compareProperties(a, b);

    return order === 'asc' ? result : -result;
  },
);
