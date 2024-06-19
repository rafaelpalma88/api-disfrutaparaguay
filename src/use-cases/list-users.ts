import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ListUsersError } from "./errors/list-users-error";

interface ListUsersUseCaseResponse {
  users: User[];
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.listUsers();

    if (!users) {
      throw new ListUsersError();
    }

    return { users };
  }
}
