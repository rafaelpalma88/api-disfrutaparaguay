import { type Prisma, type User } from "@prisma/client";

export class InMemoryUsersRepository {
  public users: User[] = [];

  async create({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    this.users.push({ name, email, password_hash });

    return user;
  }
}
