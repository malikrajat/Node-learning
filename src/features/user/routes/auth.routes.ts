import { Router } from 'express';
import authController from '../controllers/auth.controller';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';
import { verifyUser } from 'src/globals/middleware/verifyUser.middleware';

const authRoutes = Router();
authRoutes.post('/signup', asyncWrapper(authController.singUp));
authRoutes.post('/signin', asyncWrapper(authController.singIn));
authRoutes.post('/me', verifyUser, asyncWrapper(authController.getCurrentUser));
authRoutes.post('/logout', verifyUser, asyncWrapper(authController.logout));

export default authRoutes;
