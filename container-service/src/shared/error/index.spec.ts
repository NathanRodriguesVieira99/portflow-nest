import { AppError } from '.';

describe('AppError', () => {
  it('should return an error with status code and message', () => {
    const error = AppError('BAD_REQUEST', 'Invalid request!');
    expect(error).toEqual({
      code: 'BAD_REQUEST',
      status: 400,
      message: 'Invalid request!',
    });
  });

  it('should return details when provided', () => {
    const details = { field: 'email' };
    const error = AppError('BAD_REQUEST', 'Invalid request!', details);
    expect(error).toEqual({
      code: 'BAD_REQUEST',
      status: 400,
      message: 'Invalid request!',
      details,
    });
  });

  it('should omit details when undefined', () => {
    const error = AppError('BAD_REQUEST', 'Invalid request!');
    expect(error).not.toHaveProperty('details');
  });
});
