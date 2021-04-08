import { HttpError } from './HttpError';

export class BadRequest extends HttpError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}
