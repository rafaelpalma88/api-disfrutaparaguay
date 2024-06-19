import { type FastifyInstance } from "fastify";
import { register } from "./register.controller";
import { authenticate } from "./authenticate.controller";
import { profile } from "./profile.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { refresh } from "./refresh.controller";
import { verifyUserRole } from "@/middlewares/verify-user-role";
import { listUsers } from "./list-users.controller";
//TODO: plugin importação dependências.

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", register);
  app.get(
    "/users",
    { onRequest: [verifyJWT, verifyUserRole("ADMIN")] },
    listUsers,
  );

  // TODO: create route /http /repositories /use-cases
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  app.post("/me", { onRequest: [verifyJWT] }, profile);
}

// TODO: Finalizar testes E2E.
