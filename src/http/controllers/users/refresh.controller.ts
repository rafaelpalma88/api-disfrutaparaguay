import { type FastifyReply, type FastifyRequest } from "fastify";

export async function refresh(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  await request.jwtVerify({ onlyCookie: true });

  const { role } = request.user;

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    },
  );

  return reply
    .status(200)
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({
      token,
    });
}
