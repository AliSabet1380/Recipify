"use server";
import { verifySession } from "@/lib/cookie";
import type { Context, Next, MiddlewareHandler } from "hono";
import { cookies } from "next/headers";

declare module "hono" {
  interface ContextVariableMap {
    userId: string;
  }
}

export const validateUser: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  const session = cookies().get("session")?.value;
  if (!session) return c.json({ error: "session not found" }, 401);

  const payload = await verifySession(session);
  if (!payload) return c.json({ error: "session not valid" }, 401);

  c.set("userId", payload.userId);

  await next();
};
