import { cookies } from "next/headers";
import { Hono } from "hono";
import { eq, sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { InsertUserSchema, recipes, users } from "@/db/schema";

import { coparePassword, createHashPassword } from "@/lib/bcrypt";
import { createSession, deleteSession, verifySession } from "@/lib/cookie";

const app = new Hono()
  .get(
    "/me",

    async (c) => {
      const session = cookies().get("session")?.value;
      if (!session) return c.json({ error: "unauthorized" }, 401);

      const payload = await verifySession(session);
      if (!payload) return c.json({ error: "unauthorized" }, 401);

      const [data] = await db
        .select({
          id: users.id,
          username: users.username,
          email: users.email,
          avatar: users.avatar,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .from(users)
        .leftJoin(recipes, eq(users.id, recipes.authorId))
        .where(eq(users.id, payload.userId));
      if (!data) return c.json({ error: "not found" }, 404);

      return c.json({ data }, 200);
    }
  )
  .post(
    "/sign-up",
    zValidator(
      "json",
      InsertUserSchema.pick({
        email: true,
        username: true,
        password: true,
      })
    ),
    async (c) => {
      const { email, username, password } = c.req.valid("json");
      const hashPassword = await createHashPassword(password);

      const [data] = await db
        .insert(users)
        .values({
          email,
          username,
          password: hashPassword,
        })
        .returning({
          id: users.id,
          email: users.email,
          avatar: users.avatar,
          username: users.username,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        });
      if (!data) return c.json({ error: "Fail to signup" }, 500);

      await createSession(data.id);
      return c.json({ data }, 201);
    }
  )
  .post(
    "/sign-in",
    zValidator(
      "json",
      InsertUserSchema.pick({
        email: true,
        password: true,
      })
    ),
    async (c) => {
      const { email, password } = c.req.valid("json");

      const [data] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (!data) return c.json({ error: "wrong passowrd or email" }, 404);

      const isPasswordValid = await coparePassword(password, data.password);
      if (!isPasswordValid)
        return c.json({ error: "wong password or email" }, 401);

      await createSession(data.id);
      return c.json({ data: { ...data, password: undefined } }, 200);
    }
  )
  .post("/logout", async (c) => {
    await deleteSession();

    return c.json({ data: null }, 200);
  });
export default app;
