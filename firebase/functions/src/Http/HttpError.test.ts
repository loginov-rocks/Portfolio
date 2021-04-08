import { HttpError } from './HttpError';

describe('constructor', () => {
  it('sets code and message', () => {
    const error = new HttpError(123, 'Special Error');

    expect(error.code).toBe(123);
    expect(error.message).toBe('Special Error');
  });
});

describe('toResponse', () => {
  it('transforms to response representation', () => {
    const error = new HttpError(123, 'Special Error');

    expect(error.toResponse()).toStrictEqual({
      body: {
        message: 'Special Error',
      },
      status: 123,
    });
  });
});
