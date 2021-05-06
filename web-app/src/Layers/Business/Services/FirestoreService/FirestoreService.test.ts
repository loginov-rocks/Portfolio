import { getPositionsCollectionPath } from './FirestoreService';

describe('getPositionsCollectionPath', () => {
  it('matches snapshot', () => {
    expect(getPositionsCollectionPath('userId')).toMatchSnapshot();
  });
});
