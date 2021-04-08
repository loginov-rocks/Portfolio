import { HttpResponse } from './HttpResponse';

export class HttpError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }

  toResponse(): HttpResponse<{ message: string }> {
    return {
      body: {
        message: this.message,
      },
      status: this.code,
    };
  }
}
