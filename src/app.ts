import fastify from "fastify";
import { transactionsRoutes } from "../routes/transactions";
import { eventsRoutes } from "../routes/events";
import cookie from "@fastify/cookie";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export const app = fastify();

async function init(): Promise<void> {
  app.post("/users", async (request, reply) => {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    });

    return await reply.status(201).send();
  });

  await app.register(cookie);

  await app.register(transactionsRoutes, {
    prefix: "transactions",
  });

  await app.register(eventsRoutes, {
    prefix: "events",
  });
}

init()
  .then(() => {
    // console.log("tudo ok");
  })
  .catch((error) => {
    console.log(error);
  });
