import { areArraysEqual } from './index';

describe('areArraysEqual', () => {
  it('returns true if arrays are equal', () => {
    expect(areArraysEqual([], [])).toBeTruthy();
    expect(areArraysEqual(['a'], ['a'])).toBeTruthy();
    expect(areArraysEqual(['a', 'b'], ['b', 'a'])).toBeTruthy();
  });

  it('returns false if arrays are not equal', () => {
    expect(areArraysEqual(['a'], [])).toBeFalsy();
    expect(areArraysEqual([], ['a'])).toBeFalsy();
    expect(areArraysEqual(['a', 'b', 'c'], ['b', 'a'])).toBeFalsy();
    expect(areArraysEqual(['b', 'c', 'a'], ['a', 'c'])).toBeFalsy();
  });
});
