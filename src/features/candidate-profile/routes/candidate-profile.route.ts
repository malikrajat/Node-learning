import express, { Request, Response } from 'express';
import candidateProfileController from '../controllers/candidate-profile.controller';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';
import { verifyUser } from '../../../globals/middleware/verifyUser.middleware';
import { checkPermission } from '../../../globals/middleware/checkPermission.middleware';
const candidateProfileRouter = express.Router();

candidateProfileRouter.get(
  '/',
  verifyUser,
  asyncWrapper(candidateProfileController.getAll)
);
// candidateProfileRouter.get(
//   '/:id',
//   verifyUser,
//   asyncWrapper(candidateProfileController.getById)
// );

candidateProfileRouter.post(
  '/create',
  verifyUser,
  checkPermission,
  asyncWrapper(candidateProfileController.create)
);
candidateProfileRouter.patch(
  '/:id',
  verifyUser,
  checkPermission,
  asyncWrapper(candidateProfileController.update)
);
candidateProfileRouter.delete(
  '/:id',
  verifyUser,
  checkPermission,
  asyncWrapper(candidateProfileController.remove)
);
export default candidateProfileRouter;
