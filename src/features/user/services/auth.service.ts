import prisma from '../../../globals/prisma';
import bcrypt from 'bcrypt';
import { BadRequestException } from '../../../globals/cores/error.core';
import { generateToken } from '../../../globals/helpers/jwt.helper';

class AuthService {
  async singUp(res: any) {
    const { name, email, password } = res;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: 'CANDIDATE',
      },
    });
    const accessToken = await generateToken(user);
    return accessToken;
  }

  async singIn(req: any) {
    const { email, password } = req;
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password not match');
    }
    const accessToken = await generateToken(user);
    return accessToken;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
}

export default new AuthService();
