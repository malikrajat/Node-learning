import { Request, Response, NextFunction } from 'express';
import candidateProfileService from 'src/features/candidate-profile/services/candidate-profile.service';
import { ForbiddenException } from '../cores/error.core';
import prisma from '../prisma';

export function checkPermission(model: any, foreignField: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser.id;
    const id = +req.params.id;
    const role = req.currentUser.role;

    try {
      const modelDetails = await (prisma[model] as any).findUnique({
        where: { id },
      });
      if (
        role === 'ADMIN' ||
        role === 'RECRUITER' ||
        userId === modelDetails[foreignField]
      ) {
        return next();
      }
      next(new ForbiddenException('You dont have persmission to access'));
    } catch (e) {
      next(e);
    }
  };
}
