import { Request, Response, NextFunction } from 'express';
import candidateProfileService from '../../features/candidate-profile/services/candidate-profile.service';
import { ForbiddenException } from '../cores/error.core';

export async function checkPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.currentUser.id;
  const id = +req.params.id;
  const role = req.currentUser.role;

  try {
    const candidateProfile = await candidateProfileService.getCandidateById(id);
    if (
      role === 'ADMIN' ||
      role === 'RECRUITER' ||
      userId === candidateProfile.userId
    ) {
      return next();
    }
    next(new ForbiddenException('You dont have persmission to access'));
  } catch (e) {
    next(e);
  }
}
