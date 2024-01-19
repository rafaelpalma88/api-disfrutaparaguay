import fastify from "fastify";
import * as transactionsRoutesModule from "../routes/transactions";
import cookie from "@fastify/cookie";

export const app = fastify();

async function init(): Promise<void> {
  await app.register(cookie);

  await app.register(transactionsRoutesModule.transactionsRoutes, {
    prefix: "transactions",
  });
}

init()
  .then(() => {
    console.log("tudo ok");
  })
  .catch((error) => {
    console.log(error);
  });
