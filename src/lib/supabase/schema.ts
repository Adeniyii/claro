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

export const folders = pgTable("folders", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "string"
    }).notNull(),
    title: varchar("title", {length: 255}).notNull(),
    data: text("data"),
    workspaceId: uuid("workspace_id").references(() => workspaces.id, {
        onDelete: "cascade"
    }).notNull(),
})

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "string"
    }).notNull(),
    title: varchar("title", {length: 255}).notNull(),
    data: text("data"),
    folderId: uuid("folder_id").references(() => folders.id, {
        onDelete: "cascade"
    }).notNull(),
})