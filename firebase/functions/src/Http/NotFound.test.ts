import { NotFound } from './NotFound';

describe('constructor', () => {
  it('sets code and message by default', () => {
    const error = new NotFound();

    expect(error.code).toBe(404);
    expect(error.message).toBe('Not Found');
  });
});
