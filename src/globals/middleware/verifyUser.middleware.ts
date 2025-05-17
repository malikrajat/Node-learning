import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { BadRequestException } from '../cores/error.core';

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    next(new BadRequestException('Access token not found'));
    return;
  }
  const user = (await jwt.verify(
    accessToken,
    process.env.JWT_SCRATE!
  )) as UserPayload;
  req.currentUser = user;
  next();
}
