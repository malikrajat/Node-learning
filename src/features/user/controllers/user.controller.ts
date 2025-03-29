import { NextFunction, Request, Response } from 'express';
import prisma from '../../../globals/prisma';
import userService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import createUserSchema from '../schemas/createuser.schema';

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const users = await userService.getAll();
    res.status(StatusCodes.OK).json({
      message: 'Get all users',
      data: users,
    });
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
        error,
      });
      return;
    }

    const user = await userService.create(req.body);
    res.status(StatusCodes.CREATED).json({
      message: 'Create user',
      data: user,
    });
  }
}

export default new UserController();
