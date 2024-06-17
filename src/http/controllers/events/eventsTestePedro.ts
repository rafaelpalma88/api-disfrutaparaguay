import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function eventsTestePedro(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  // dentro do request devo ter um token valido. (função decorator que vou criar em toda a função)

  // const createUserBodySchema = z.object({
  //   title: z.string(),
  // });

  // const { title } = createUserBodySchema.parse(request.body);
  try {
    // const registerUseCase = makeRegisterUseCase(); // TODO: criar um caso de uso para criação de evento.
    // await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return await reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
