import { type Prisma, type User } from "@prisma/client";
import { randomUUID } from "crypto";
import { type UsersRepository } from "./users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
      approved_at: null,
    };

    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
