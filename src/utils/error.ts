/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
export class BaseError extends Error{

  public readonly code: StatusCodes;

  public readonly description: string | undefined;

  constructor(message: string, code: StatusCodes, description?: string) {
    super(message)
    this.code = code;
    this.description = description;
    Error.captureStackTrace(this);
  }

  // Method that returns a JSON response of the error
  public toJSON() {
    return {
      message: this.message,
      code: this.code,
      description: this.description,
      stack: this.stack,
    };
  }
}

export class ServerError extends BaseError {
  constructor(name, httpCode = StatusCodes.INTERNAL_SERVER_ERROR, description = 'internal server error') {
    super(name, httpCode, description);
  }
}

export function isAnError(error: any): boolean {
  return error instanceof Error;
}
