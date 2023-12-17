import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import wLogger from "@/lib/logger";

const logger = wLogger({ logName: "db", level: "info" });

// configure dotenv
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
   logger.error("DATABASE_URL not found in .env file")
    process.exit(1);
}

export default {
    schema: "./src/lib/supabase/schema.ts",
    out: "./migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    }
} satisfies Config;