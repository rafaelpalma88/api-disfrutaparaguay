import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    const { user } = await registerUseCase.execute({ name, email, password });

    return reply
      .status(201)
      .send({ user: { ...user, password_hash: undefined } });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return await reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
