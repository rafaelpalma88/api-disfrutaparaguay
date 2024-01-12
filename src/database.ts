import "dotenv/config";
import knex, { type Knex } from "knex";
import { env } from "./env";

if (process?.env?.DATABASE_URL == null) {
  throw new Error("DATABASE_URL env not found");
}

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

const db = knex(config);

export { db };
