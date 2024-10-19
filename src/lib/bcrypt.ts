"use server";

import { genSalt, compare, hash } from "bcryptjs";

export const createHashPassword = async (
  password: string,
  round: number = 10
): Promise<string> => {
  const salt = await genSalt(round);
  return await hash(password, salt);
};

export const coparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => await compare(password, hashPassword);
