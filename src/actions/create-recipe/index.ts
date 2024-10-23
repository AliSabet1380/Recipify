"use server";

import { db } from "@/db/drizzle";
import { recipes } from "@/db/schema";

import { InputType, ReturnType } from "@/actions/create-recipe/types";

const handler = async (validateData: InputType): Promise<ReturnType> => {
  const { desc, recipe, title, userId, coverImg } = validateData;

  let data;
  try {
    if (coverImg) {
    }

    [data] = await db
      .insert(recipes)
      .values({
        authorId: userId,
        desc,
        title,
        recipe,
      })
      .returning();
  } catch (error) {
    return { errors: "Fail to create recipe" };
  }

  return { data };
};
