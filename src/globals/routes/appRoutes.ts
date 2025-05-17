import { Application } from 'express';
import userRoutes from '../../features/user/routes/user.routes';
import authRoutes from '../../features/user/routes/auth.routes';
import candidateProfileRouter from '../../features/candidate-profile/routes/candidate-profile.route';

export function appRoutes(app: Application): void {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/candidate-profile', candidateProfileRouter);
}
