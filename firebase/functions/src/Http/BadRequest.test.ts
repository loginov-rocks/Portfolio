import { BadRequest } from './BadRequest';

describe('constructor', () => {
  it('sets code and message by default', () => {
    const error = new BadRequest();

    expect(error.code).toBe(400);
    expect(error.message).toBe('Bad Request');
  });
});
