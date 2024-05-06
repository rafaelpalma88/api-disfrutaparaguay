import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const createUserBodySchema = z.object({
    // name: z.string(),
    // email: z.string().email(),
    // password: z.string().min(6),
    // TODO: continuar aqui
  });

  // const { name, email, password } = createUserBodySchema.parse(request.body);

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
