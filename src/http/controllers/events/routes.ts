import { type FastifyInstance } from "fastify";
// import { event } from "./event.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function eventsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook("onRequest", verifyJWT); // Daqui para baixo todas as rotas deverão ser autenticadas

  // Autenticated
  // app.get("/events", event);
}
