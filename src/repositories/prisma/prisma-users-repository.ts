import { prisma } from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithSameEmail) {
      return null;
    }

    return userWithSameEmail;
  }
}
