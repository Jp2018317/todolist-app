import type { Config } from "drizzle-kit";
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "./config/config";

export default {
  schema: "./db/schema",
  driver: "turso",
  dbCredentials: {
    url: DATABASE_URL!,
    authToken: DATABASE_AUTH_TOKEN
  },
  out: "./drizzle",
} satisfies Config;