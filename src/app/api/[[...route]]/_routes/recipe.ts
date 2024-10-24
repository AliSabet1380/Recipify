import { z } from "zod";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { recipes } from "@/db/schema";

const app = new Hono().post(
  "/own-recipes",
  zValidator(
    "json",
    z.object({
      userId: z.string(),
    })
  ),
  async (c) => {
    const { userId } = c.req.valid("json");
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
);

export default app;
