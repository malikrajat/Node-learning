import { NextFunction, Request, Response } from 'express';

export default function asyncWrapper(callback: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
}
