import { StatusCodes } from 'http-status-codes';

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'Error';
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'Error';
  constructor(message: string) {
    super(message);
  }
}
export class UnAuthorizedException extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'Error';
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  status = 'Error';
  constructor(message: string) {
    super(message);
  }
}

export class ForbiddenException extends CustomError {
  statusCode = StatusCodes.FORBIDDEN;
  status = 'Error';
  constructor(message: string) {
    super(message);
  }
}
