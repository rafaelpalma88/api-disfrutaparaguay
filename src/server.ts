import { app } from "./app";
import { env } from "@/env";

// const port = process.env.PORT || 4000;

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Server is running");
  })
  .catch((error) => {
    console.log(error);
  });
