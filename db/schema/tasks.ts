import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user";

const tasks = sqliteTable('tasks', {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text('text').unique().notNull(),
  status: text('text').notNull(),
  createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updatedAt'),
  user: text("user").references(() => users.username)
});