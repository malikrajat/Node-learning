import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import candidateProfileService from '../services/candidate-profile.service';

class CandidateProfileController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const candidateProfiles = await candidateProfileService.getAll();
    if (!candidateProfiles) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'candidate profiles not found' });
    }
    res.status(StatusCodes.OK).json({
      message: 'candidate profiles',
      profiles: candidateProfiles,
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const candidateProfile = await candidateProfileService.create(
      req.body,
      req.currentUser
    );
    if (!candidateProfile) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'candidate profile not created' });
    }
    return res.status(StatusCodes.CREATED).json({
      message: 'candidate profile created',
      profile: candidateProfile,
    });
  }

  // async getById(req: Request, res: Response, next: NextFunction) {
  //   const candidateProfile = await candidateProfileService.getById(
  //     +req.params.id
  //   );
  //   if (!candidateProfile) {
  //     return res
  //       .status(StatusCodes.NOT_FOUND)
  //       .json({ message: 'candidate profile not found' });
  //   }
  //   return res.status(StatusCodes.OK).json({
  //     message: 'candidate profile',
  //     profile: candidateProfile,
  //   });
  // }

  async update(req: Request, res: Response, next: NextFunction) {
    const candidateProfile = await candidateProfileService.update(
      +req.params.id,
      req.body
    );
    if (!candidateProfile) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'candidate profile not found' });
    }
    return res.status(StatusCodes.OK).json({
      message: 'candidate profile updated',
      profile: candidateProfile,
    });
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    await candidateProfileService.remove(+req.params.id);
    res.status(StatusCodes.OK).json({
      message: 'candidate profile Deleted succesfully',
    });
  }
}
export default new CandidateProfileController();
