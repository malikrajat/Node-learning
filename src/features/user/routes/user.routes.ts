import express from 'express';
import userController from '../controllers/user.controller';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';
import { verifySchema } from '../../../globals/middleware/verifiySchema.middleware';
import createUserSchema from '../schemas/createuser.schema';
const userRoutes = express.Router();

userRoutes.get('/', asyncWrapper(userController.getAll));
userRoutes.post(
  '/create',
  verifySchema(createUserSchema),
  asyncWrapper(userController.create)
);

export default userRoutes;
