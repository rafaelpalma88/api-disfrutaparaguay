import { postsMock } from "@/mocks/postsMock";
import { type FastifyReply, type FastifyRequest } from "fastify";

export async function list(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  return reply.status(200).send({ posts: postsMock });
}
