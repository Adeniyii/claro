import {pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";


export const workspaces = pgTable("workspaces", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "string"
    }).notNull(),
    title: varchar("title", {length: 255}).notNull(),
    data: text("data"),
})