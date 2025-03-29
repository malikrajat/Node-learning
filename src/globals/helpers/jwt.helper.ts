import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export async function generateToken(payload: User) {
  const accessToken = await jwt.sign(
    {
      name: payload.name,
      id: payload.id,
      role: payload.role,
      email: payload.email,
    },
    process.env.JWT_SCRATE!,
    {
      expiresIn: '1d',
    }
  );
  return accessToken;
}
