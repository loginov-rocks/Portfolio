import { firebaseCollectionToArray } from './index';

describe('firebaseCollectionToArray', () => {
  it('transforms firebase collection to array', () => {
    expect(firebaseCollectionToArray({
      first: { firstProperty: 'firstValue' },
      second: { secondProperty: 'secondValue' },
    })).toStrictEqual([
      { firstProperty: 'firstValue', id: 'first' },
      { id: 'second', secondProperty: 'secondValue' },
    ]);
  });
});
