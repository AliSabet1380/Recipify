"use server";

import { encrypt } from "@/lib/cookie";
import { cookies } from "next/headers";

export const setCookie = async () => {
  const expiresAt = new Date(Date.now() + 10 * 1000000000000);
  const session = await encrypt({
    userId: "976fba92-5379-4703-b2a9-71e7922bd407",
    expiresAt,
  });

  cookies().set("session", session, {
    httpOnly: true,
  });
};
