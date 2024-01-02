import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const tasks = sqliteTable('tasks', {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  status: text('status', { enum: ["Complete", "Incomplete"] }).default("Incomplete").notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt'),
  author: text("author").references(() => users.username).notNull(),
});