import axios from 'axios';

import latestFixture from './__fixtures__/latest';
import RatesApi from './RatesApi';

const instance = new RatesApi('https://example.com', 'USD');

describe('getLatest', () => {
  it('makes request to Rates API to obtain latest rates', () => {
    (axios as jest.Mocked<typeof axios>).get.mockImplementationOnce(() => Promise.resolve({
      data: latestFixture,
    }));

    return instance.getLatest().then(latest => {
      expect(latest).toStrictEqual(latestFixture);
    });
  });
});
