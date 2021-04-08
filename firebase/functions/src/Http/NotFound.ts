import { HttpError } from './HttpError';

export class NotFound extends HttpError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}
