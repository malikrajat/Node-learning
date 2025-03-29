import { User } from '@prisma/client';
import prisma from '../../../globals/prisma';

class UserService {
  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }
  async create(req: any): Promise<User> {
    const { name, email, password, role } = req;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password,
      },
    });
    return user;
  }
}
export default new UserService();
