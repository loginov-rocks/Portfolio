/* @flow */

export const areArraysEqual = (a, b) => {
  if (a.length === b.length) {
    return true;
  }

  const sortedA = a.sort();
  const sortedB = b.sort();

  return sortedA.every((value, index) => value === sortedB[index]);
};
