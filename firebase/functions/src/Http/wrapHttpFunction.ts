import { Response } from 'express';
import { Request } from 'firebase-functions/lib/providers/https';

import { Logger } from 'Logger/Logger';

import { HttpError } from './HttpError';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';
import { InternalServerError } from './InternalServerError';

export const wrapHttpFunction = <TRequest, TResponse>(
  handler: (request: HttpRequest<TRequest>) => Promise<HttpResponse<TResponse>>,
  logger: Logger,
// eslint-disable-next-line arrow-body-style
) => {
  return async (request: Request, response: Response): Promise<void> => {
    const { body, method } = request;

    let httpResponse;

    try {
      httpResponse = await handler({ body, method });
    } catch (error) {
      if (error instanceof HttpError) {
        httpResponse = error.toResponse();
      } else {
        logger.error('Unexpected error caught', error);
        httpResponse = new InternalServerError().toResponse();
      }
    }

    response.status(httpResponse.status).send(httpResponse.body);
  };
};
