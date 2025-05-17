import express, { Application, NextFunction, Request, Response } from 'express';
import { appRoutes } from './globals/routes/appRoutes';
import { StatusCodes } from 'http-status-codes';
import { error } from 'console';
import { CustomError, NotFoundException } from './globals/cores/error.core';
import CookieParser from 'cookie-parser';

export default class Server {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public start(): void {
    this.middlewares();
    this.setupRoutes();
    this.setupGlobalErrorHandling();
    this.listenServer();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(CookieParser());
  }
  private setupRoutes(): void {
    appRoutes(this.app);
  }
  private setupGlobalErrorHandling(): void {
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      // res.status(StatusCodes.NOT_FOUND).json({
      //   status: 'fail',
      //   message: `Can't find ${req.originalUrl} on this server! with method ${req.method}`,
      // });
      next(
        new NotFoundException(
          `Can't find ${req.originalUrl} on this server! with method ${req.method}`
        )
      );
    });
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
          });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: 'Error',
          message: 'Something went wrong',
        });
      }
    );
  }

  private listenServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
