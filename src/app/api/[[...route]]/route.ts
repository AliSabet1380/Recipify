import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/app/api/[[...route]]/_routes/auth";
import recipes from "@/app/api/[[...route]]/_routes/recipe";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", auth).route("/recipes", recipes);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
