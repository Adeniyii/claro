import {drizzle} from "drizzle-orm/postgres-js";
import {migrate} from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "../../../migrations/schema"
import * as dotenv from "dotenv";
import wLogger from "@/lib/logger";

dotenv.config({path: ".env"});
const logger = wLogger({logName: "db", level: "info"});

if (!process.env.DATABASE_URL) {
    logger.error("DATABASE_URL not found in .env file");
    process.exit(1);
}

const connString = process.env.DATABASE_URL;

const sql = postgres(connString, {max: 1})
const db = drizzle(sql, {schema});
const migrateDB = async () => {
    try {
        logger.info("Starting migration")
        await migrate(db, {migrationsFolder: "migrations"});
        logger.info("Migration completed successfully");
    } catch (e) {
        logger.error("Migration failed", e);
        process.exit(1);
    }
}
// void migrateDB();

export default db;