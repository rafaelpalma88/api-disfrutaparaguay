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

  async findByEmail(email: string): Promise<{
    id: string;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
    approved_at: Date | null;
  } | null> {
    throw new Error("Method not implemented.");
  }
}
