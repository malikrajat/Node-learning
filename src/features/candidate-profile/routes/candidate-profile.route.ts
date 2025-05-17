import express, { Request, Response } from 'express';
import candidateProfileController from '../controllers/candidate-profile.controller';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';
import { verifyUser } from '../../../globals/middleware/verifyUser.middleware';
const candidateProfileRouter = express.Router();

candidateProfileRouter.get(
  '/',
  verifyUser,
  asyncWrapper(candidateProfileController.getAll)
);
candidateProfileRouter.get(
  '/:id',
  verifyUser,
  asyncWrapper(candidateProfileController.getById)
);

candidateProfileRouter.post(
  '/create',
  verifyUser,
  asyncWrapper(candidateProfileController.create)
);
candidateProfileRouter.patch(
  '/:id',
  verifyUser,
  asyncWrapper(candidateProfileController.update)
);
export default candidateProfileRouter;
