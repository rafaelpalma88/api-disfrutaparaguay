import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ListUsersUseCase } from "@/use-cases/list-users";
import { type FastifyReply, type FastifyRequest } from "fastify";

export async function listUsers(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const usersRepository = new PrismaUsersRepository();
  const listUsersUseCase = new ListUsersUseCase(usersRepository);

  const { users } = await listUsersUseCase.execute();

  const usersWithoutPassword = users.map((user) => ({
    ...user,
    password_hash: undefined,
  }));

  return reply.status(200).send(usersWithoutPassword);
}
