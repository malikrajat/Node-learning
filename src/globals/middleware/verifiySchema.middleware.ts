import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'joi';
import { format } from 'path';

export function verifySchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
        error: formatErrorMessage(error),
      });
      return;
    }
    next();
  };
}
function formatErrorMessage(error: ValidationError) {
  return error.details.map((detail) => error.message);
}
