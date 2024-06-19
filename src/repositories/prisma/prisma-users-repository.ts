import { prisma } from "@/lib/prisma";
import { User, Prisma, $Enums } from "@prisma/client";
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
  async findById(id: string): Promise<User | null> {
    const userWithSameId = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userWithSameId) {
      return null;
    }

    return userWithSameId;
  }

  async listUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();

    if (!users) {
      return [];
    }

    return users;
  }
}
