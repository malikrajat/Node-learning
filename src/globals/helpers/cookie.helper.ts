import { Response } from 'express';

export function sendTokenCookie(res: Response, token: string) {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000,
  });
}
