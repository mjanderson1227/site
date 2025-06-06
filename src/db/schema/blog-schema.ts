import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const blog = sqliteTable("blog", {
  id: integer("id").primaryKey(),
  /* TODO: remove unique constraint on title when multiple authors are supported */
  title: text("title").notNull().unique(),
  content: text("content").notNull(),
  authorId: text("author_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const blogRelations = relations(blog, ({ one }) => ({
  author: one(user, { fields: [blog.authorId], references: [user.id] }),
}));

export const extendedUserRelations = relations(user, ({ many }) => ({
  blogPosts: many(blog),
}));
