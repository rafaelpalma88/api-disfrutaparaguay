import { type FastifyInstance } from "fastify";
// import { verifyJWT } from "@/middlewares/verify-jwt";
import { list } from "./list";
// import { verifyUserRole } from "@/middlewares/verify-user-role";

export async function postsRoutes(app: FastifyInstance): Promise<void> {
  // app.addHook("onRequest", verifyJWT);

  // app.get("/posts", { onRequest: [verifyUserRole(["ADMIN", "MEMBER"])] }, list);
  app.get("/posts", list);
}
