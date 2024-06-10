import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import cors from "@fastify/cors";

export const app = fastify();

// Registre o plugin fastify-cors
app.register(cors, {
  origin: "*", // Permitir solicitações de todas as origens (somente para fins de desenvolvimento)
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: true,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
// app.register(eventsRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    console.error(error);
    // Log externo para uma ferramenta como DataDog/ New Relic / Sentry etc.
  }

  return reply.status(500).send({ message: "Internal server error" });
});
