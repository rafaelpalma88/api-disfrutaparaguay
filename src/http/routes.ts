import { type FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";
import { profile } from "./controllers/profile.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", register);
  app.post("/events", register);
  app.post("/sessions", authenticate);

  // Autenticated
  app.post("/me", { onRequest: [verifyJWT] }, profile);
}
