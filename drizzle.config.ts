import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/drizzle",
  strict: true,
  verbose: true,
});
