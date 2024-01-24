import fastify from "fastify";
import { transactionsRoutes } from "../routes/transactions";
import { eventsRoutes } from "../routes/events";
import cookie from "@fastify/cookie";
// import { PrismaClient } from "@prisma/client";

export const app = fastify();

// const prisma = new PrismaClient();

async function init(): Promise<void> {
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
    console.log("tudo ok");
  })
  .catch((error) => {
    console.log(error);
  });
