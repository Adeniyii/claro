import {boolean, integer, jsonb, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {prices, subscriptionStatus} from "../../../migrations/schema";

export const workspaces = pgTable("workspaces", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "string"
    }).notNull(),
    title: varchar("title", {length: 255}).notNull(),
    data: text("data"),
    workspaceOwner: uuid("workspace_owner").notNull(),
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

export const subscriptions = pgTable("subscriptions", {
    id: text("id").primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    status: subscriptionStatus("status"),
    metadata: jsonb("metadata"),
    priceId: text("price_id").references(() => prices.id),
    quantity: integer("quantity"),
    cancelAtPeriodEnd: boolean("cancel_at_period_end"),
    created: timestamp("created", {withTimezone: true, mode: 'string'}).default(sql`now()`).notNull(),
    currentPeriodStart: timestamp("current_period_start", {
        withTimezone: true,
        mode: 'string'
    }).default(sql`now()`).notNull(),
    currentPeriodEnd: timestamp("current_period_end", {
        withTimezone: true,
        mode: 'string'
    }).default(sql`now()`).notNull(),
    endedAt: timestamp("ended_at", {withTimezone: true, mode: 'string'}).default(sql`now()`),
    cancelAt: timestamp("cancel_at", {withTimezone: true, mode: 'string'}).default(sql`now()`),
    canceledAt: timestamp("canceled_at", {withTimezone: true, mode: 'string'}).default(sql`now()`),
    trialStart: timestamp("trial_start", {withTimezone: true, mode: 'string'}).default(sql`now()`),
    trialEnd: timestamp("trial_end", {withTimezone: true, mode: 'string'}).default(sql`now()`),
});
