import "dotenv/config";
import knex, { type Knex } from "knex";
import { env } from "@/env";

if (process?.env?.DATABASE_URL == null) {
  throw new Error("DATABASE_URL env not found");
}

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === "sqlite"
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

const db = knex(config);

export { db };
