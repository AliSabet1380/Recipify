import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    email: text().notNull().unique(),
    username: text().notNull(),
    avatar: text().notNull().default("/no-avatar.png"),
    password: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    email_index: uniqueIndex("email_index").on(table.email),
  })
);

export const recipes = pgTable("recipes", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  desc: text().notNull(),
  ing: text().array().notNull().default([]),
  authorId: uuid()
    .notNull()
    .references(() => users.id),
  recipe: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
}));
export const recipeRelations = relations(recipes, ({ one }) => ({
  author: one(users, {
    fields: [recipes.authorId],
    references: [users.id],
  }),
}));

export const InsertUserSchema = createInsertSchema(users);
export const InsertRecipeSchema = createInsertSchema(recipes);
export type User = typeof users.$inferSelect;
