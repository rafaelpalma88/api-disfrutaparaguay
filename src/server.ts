import { app } from "./app";
import { env } from "./env";

// const port = process.env.PORT || 4000;

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is running");
  })
  .catch((error) => {
    console.log(error);
  });
