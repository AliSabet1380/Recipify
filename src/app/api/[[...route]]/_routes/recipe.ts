import { z } from "zod";
import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { recipes } from "@/db/schema";

import { verifySession } from "@/lib/cookie";

const app = new Hono()
  .get(
    "/recipes/:userId",
    zValidator(
      "param",
      z.object({
        userId: z.string(),
      })
    ),
    async (c) => {
      const { userId } = c.req.valid("param");
      if (!userId) return c.json({ error: "missing userId" }, 400);

      const session = cookies().get("session")?.value;
      if (!session) return c.json({ error: "unauthorized!" }, 401);
      const payload = await verifySession(session);
      if (!payload) return c.json({ error: "unauthorized" }, 401);

      const data = await db.query.recipes.findMany({
        where: eq(recipes.authorId, userId),

        with: {
          author: {
            columns: {
              id: true,
              username: true,
            },
          },
        },
      });

      return c.json({ data }, 200);
    }
  )
  .get(
    "/recipe/:recipeId",
    zValidator(
      "param",
      z.object({
        recipeId: z.string().optional(),
      })
    ),
    async (c) => {
      const { recipeId } = c.req.valid("param");
      if (!recipeId) return c.json({ error: "recipe id missed!" }, 400);

      const session = cookies().get("session")?.value;
      if (!session) return c.json({ error: "unauhtorized!" }, 401);
      const payload = await verifySession(session);
      if (!payload?.userId) return c.json({ error: "invalid session!" }, 401);

      const data = await db.query.recipes.findFirst({
        where: eq(recipes.id, recipeId),

        with: {
          author: {
            columns: {
              username: true,
              id: true,
            },
          },
        },
      });

      if (!data) return c.json({ error: "not found!" }, 404);
      const isAuthor = data.authorId === payload.userId;

      return c.json({ data: { isAuthor, ...data } }, 200);
    }
  )
  .delete(
    "/recipe/:recipeId",
    zValidator(
      "param",
      z.object({
        recipeId: z.string().optional(),
      })
    ),
    async (c) => {
      const { recipeId } = c.req.valid("param");
      if (!recipeId) return c.json({ error: "recipe id missing!" }, 400);

      const session = cookies().get("session")?.value;
      if (!session) return c.json({ error: "session missing!" }, 401);
      const payload = await verifySession(session);
      if (!payload) return c.json({ error: "invalid session" }, 401);

      const [data] = await db
        .delete(recipes)
        .where(
          and(eq(recipes.id, recipeId), eq(recipes.authorId, payload.userId))
        )
        .returning({
          authorId: recipes.authorId,
        });
      if (!data) return c.json({ error: "Fail to delete recipe" }, 400);

      return c.json({ data }, 200);
    }
  );

export default app;
