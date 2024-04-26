import { type FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", register);
  app.post("/me", authenticate);
}
