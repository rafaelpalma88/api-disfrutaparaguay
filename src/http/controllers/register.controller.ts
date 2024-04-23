import { prisma } from "@/lib/prisma";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";
import bcryptjs from "bcryptjs";

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

  const passwordHash = await bcryptjs.hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail != null) {
    return await reply.status(409).send();
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  });

  return await reply.status(201).send();
}
