import dotenv from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test", override: true });
} else {
  dotenv.config();
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables!", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
