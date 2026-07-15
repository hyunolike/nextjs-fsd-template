import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Type-safe environment variables, validated at build/boot time.
 * Add new variables here instead of reading `process.env` directly elsewhere.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    MOCK_AUTH_SECRET: z
      .string()
      .min(1)
      .default("dev-only-secret-do-not-use-in-prod"),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z
      .string()
      .url()
      .default("http://localhost:3000/api"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});
