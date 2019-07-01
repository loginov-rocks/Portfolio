export const areArraysEqual = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = a.sort();
  const sortedB = b.sort();

  return sortedA.every((value, index) => value === sortedB[index]);
};
