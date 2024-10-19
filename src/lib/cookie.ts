"use server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

interface Payload {
  userId: string;
  expiresAt: Date;
}
interface Decoded {
  userId: string;
  expiresAt: Date;
  iat: number;
  exp: number;
}

const secret = new TextEncoder().encode(process.env.JOSE_SECRET);

export const encrypt = async ({
  userId,
  expiresAt,
}: Payload): Promise<string> => {
  const session = await new SignJWT({ userId, expiresAt })
    .setIssuedAt()
    .setExpirationTime("2d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return session;
};

export const decrypt = async (session?: string): Promise<Decoded | null> => {
  try {
    if (!session) return null;
    const payload = (
      await jwtVerify(session, secret, {
        algorithms: ["HS256"],
      })
    ).payload as unknown as {
      userId: string;
      expiresAt: Date;
      iat: number;
      exp: number;
    };
    return payload;
  } catch (error) {
    return null;
  }
};

export const deleteSession = async (): Promise<void> => {
  cookies().delete("session");
};

export const createSession = async (
  userId: string,
  redirectTo?: string
): Promise<void> => {
  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    expires: expiresAt,
  });

  redirectTo && redirect(redirectTo);
};

export const verifySession = async (
  session: string
): Promise<Payload | null> => {
  const decoded = await decrypt(session);
  if (!decoded) return null;

  const isSessionValid = new Date(decoded.expiresAt).getTime() > Date.now();
  if (!isSessionValid) return null;

  return { expiresAt: decoded.expiresAt, userId: decoded.userId };
};

export const updateSession = async (): Promise<void> => {
  const session = cookies().get("session")?.value;
  if (!session) return;

  const decoded = await decrypt(session);
  if (!decoded) return;

  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const newSession = await encrypt({ userId: decoded?.userId, expiresAt });

  cookies().set("session", newSession, {
    httpOnly: true,
    expires: expiresAt,
  });
};
