import { type FastifyInstance } from "fastify";
import { register } from "./register.controller";
import { authenticate } from "./authenticate.controller";
import { profile } from "./profile.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", register);
  app.post("/events", register);
  app.post("/sessions", authenticate);

  // Autenticated
  app.post("/me", { onRequest: [verifyJWT] }, profile);
}
