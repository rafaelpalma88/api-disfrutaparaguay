import dotenv from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  console.log("node env test");
  dotenv.config({ path: ".env.test", override: true });
} else {
  console.log("node env else");
  dotenv.config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_CLIENT: z.enum(["sqlite", "pg"]),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables!", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
