import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
  console.log("reply", reply);
  if (error instanceof ZodError) {
    console.log("caimos aqui");
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }
});
