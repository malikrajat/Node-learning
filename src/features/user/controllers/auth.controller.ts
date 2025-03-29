import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '../services/auth.service';
import { sendTokenCookie } from '../../../globals/helpers/cookie.helper';
import jwt from 'jsonwebtoken';

class AuthController {
  //   constructor(private authService: AuthService) {}

  async singUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    const accessToken = await authService.singUp(req.body);
    // res.cookie('accessToken', accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   maxAge: 60 * 60 * 1000,
    // }); // Set cookie

    sendTokenCookie(res, accessToken);

    res.status(StatusCodes.CREATED).json({
      message: 'User created',
      data: accessToken,
    });
  }

  async singIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    const accessToken = await authService.singIn(req.body);
    res
      .status(StatusCodes.OK)
      .json({ message: 'User signed in', data: accessToken });
  }
  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    res
      .status(StatusCodes.OK)
      .json({ message: 'User Current logged in', data: req.currentUser });
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie('accessToken');
    res.status(StatusCodes.OK).json({ message: 'User logged out' });
  } // Clear cookie on logout
}

export default new AuthController();
