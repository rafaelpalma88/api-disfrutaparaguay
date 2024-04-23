import { type FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", register);
}
