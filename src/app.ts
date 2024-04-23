import fastify from "fastify";
// import { transactionsRoutes } from "../routes/transactions";
// import { eventsRoutes } from "../routes/events";
// import cookie from "@fastify/cookie";
import { appRoutes } from "./http/routes";

export const app = fastify();

async function init(): Promise<void> {
  await app.register(appRoutes);

  // await app.register(transactionsRoutes, {
  //   prefix: "transactions",
  // });

  // await app.register(eventsRoutes, {
  //   prefix: "events",
  // });
}

init()
  .then(() => {
    // console.log("tudo ok");
  })
  .catch((error) => {
    console.log(error);
  });
