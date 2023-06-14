/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
export class BaseError extends Error{

  public readonly statusCode: StatusCodes;

  public readonly description: string | undefined;

  constructor(message: string, code: StatusCodes = 500, description?: string) {
    super(message)
    this.statusCode = code;
    this.description = description;
  }

}


