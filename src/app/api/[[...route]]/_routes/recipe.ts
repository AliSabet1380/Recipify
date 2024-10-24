import { z } from "zod";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { recipes } from "@/db/schema";
import { verifySession } from "@/lib/cookie";
import { cookies } from "next/headers";

const app = new Hono()
  .post(
    "/own-recipes",
    zValidator(
      "json",
      z.object({
        userId: z.string(),
      })
    ),
    async (c) => {
      const { userId } = c.req.valid("json");

      const session = cookies().get("session")?.value;
      if (!session) return c.json({ error: "unauthorized!" }, 401);
      const payload = await verifySession(session);
      if (!payload) return c.json({ error: "unauthorized" }, 401);

      const data = await db.query.recipes.findMany({
        where: eq(recipes.authorId, userId),

        with: {
          author: {
            columns: {
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

      return c.json({ data }, 200);
    }
  );

export default app;
