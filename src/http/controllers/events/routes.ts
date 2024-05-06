import { type FastifyInstance } from "fastify";
// import { event } from "./event.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { create } from "./create";
import { verifyUserRole } from "@/middlewares/verify-user-role";

export async function eventsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook("onRequest", verifyJWT); // Daqui para baixo todas as rotas deverão ser autenticadas

  // Autenticated
  // app.get("/events", event);
  app.post("/events", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
