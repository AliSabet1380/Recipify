import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  username: text().notNull(),
  avatar: text().notNull().default("/no-avatar.png"),
  password: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const recipes = pgTable("recipes", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  desc: text().notNull(),
  ing: text().array().notNull().default([]),
  authorId: uuid()
    .notNull()
    .references(() => users.id),
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
export const SelectUserSchema = createSelectSchema(users);
