import { cookies } from "next/headers";
import { decrypt } from "./lib/cookie";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const publicRoutes = ["/login"];

  const path = req.nextUrl.pathname;

  const isPublic = publicRoutes.includes(path);
  const isRouteProtected = path.startsWith("/dashboard/");
  const isApiProtected = path.startsWith("/api/recipes");

  const session = cookies().get("session")?.value;
  const decoded = await decrypt(session);

  if (isApiProtected && !decoded?.userId) {
    return NextResponse.json({ error: "Invalid session!" });
  }

  if (isRouteProtected && !decoded?.userId)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  if (isPublic && decoded?.userId)
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));

  NextResponse.next();
};
