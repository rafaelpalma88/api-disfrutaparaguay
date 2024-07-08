import { FastifyReply, FastifyRequest } from "fastify";

type UserRole = "ADMIN" | "MEMBER" | "NOT_APPROVED";

export function verifyUserRole(rolesToVerify: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user as { role: UserRole }; // Assegurando que `role` é do tipo `UserRole`

    if (!rolesToVerify.includes(role)) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  };
}

// import { FastifyReply, FastifyRequest } from "fastify";

// export function verifyUserRole(
//   roleToVerify: "ADMIN" | "MEMBER" | "NOT_APPROVED",
// ) {
//   return async (request: FastifyRequest, reply: FastifyReply) => {
//     const { role } = request.user;

//     if (role !== roleToVerify) {
//       return reply.status(401).send({ message: "Unauthorized" });
//     }
//   };
// }
