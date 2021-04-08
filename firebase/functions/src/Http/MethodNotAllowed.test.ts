import { MethodNotAllowed } from './MethodNotAllowed';

describe('constructor', () => {
  it('sets code and message by default', () => {
    const error = new MethodNotAllowed();

    expect(error.code).toBe(405);
    expect(error.message).toBe('Method Not Allowed');
  });
});
