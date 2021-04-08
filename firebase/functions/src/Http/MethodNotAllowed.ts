import { HttpError } from './HttpError';

export class MethodNotAllowed extends HttpError {
  constructor(message = 'Method Not Allowed') {
    super(405, message);
  }
}
