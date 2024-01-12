import { type FastifyReply, type FastifyRequest } from "fastify";

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<any> {
  const { sessionId } = request.cookies;

  if (sessionId == null) {
    return await reply.status(401).send({
      error: "Unauthorized",
    });
  }
}
