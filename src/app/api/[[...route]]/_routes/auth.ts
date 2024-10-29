import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { InsertUserSchema, users } from "@/db/schema";

import { coparePassword, createHashPassword } from "@/lib/bcrypt";
import { createSession, deleteSession } from "@/lib/cookie";

import { validateUser } from "@/app/api/[[...route]]/_middleware/user";

const app = new Hono()
  .get("/me", validateUser, async (c) => {
    const userId = c.get("userId");

    const data = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        avatar: true,
        id: true,
        createdAt: true,
        email: true,
        updatedAt: true,
        username: true,
      },
    });
    if (!data) {
      await deleteSession();
      return c.json({ error: "session not valid" }, 401);
    }

    return c.json({ data }, 200);
  })
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
