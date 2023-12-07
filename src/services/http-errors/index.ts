import { HttpError as IHttpError } from '@interfaces/errors';
import { isHttpErrorStatus } from '@utils/validations';

class HttpError extends Error implements IHttpError {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';

    if (!isHttpErrorStatus(status)) {
      throw new Error('Invalid Http error status');
    }

    this.status = status;
  }
}

export default HttpError;
