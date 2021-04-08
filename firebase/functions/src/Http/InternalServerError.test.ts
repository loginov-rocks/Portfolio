import { InternalServerError } from './InternalServerError';

describe('constructor', () => {
  it('sets code and message by default', () => {
    const error = new InternalServerError();

    expect(error.code).toBe(500);
    expect(error.message).toBe('Internal Server Error');
  });
});
