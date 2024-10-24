"use server";

import { db } from "@/db/drizzle";
import { recipes } from "@/db/schema";

import { firebaseStorage } from "@/firebase/storage";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { safeAction } from "@/actions/safe-action";
import { CreateRecipeSchema } from "@/actions/create-recipe/schema";
import { InputType, ReturnType } from "@/actions/create-recipe/types";
import { FormSchema } from "@/actions/create-recipe/form-data-schema";

const handler = async (validateData: InputType): Promise<ReturnType> => {
  const { ings, userId, formData } = validateData;
  const coverImg = formData.get("coverImg") as File;

  const parsedData = FormSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    return { errors: parsedData.error.errors[0].message };
  }
  const { desc, recipe, title } = parsedData.data;

  if (!userId) return { errors: "userId Missed!" };

  let data;
  try {
    if (coverImg.size > 0) {
      const storageRef = ref(firebaseStorage, `${coverImg.name}-${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, coverImg);

      const coverImgUrl = await getDownloadURL((await uploadTask).ref);

      [data] = await db
        .insert(recipes)
        .values({
          desc,
          recipe,
          title,
          ings,
          authorId: userId,
          coverImg: coverImgUrl,
        })
        .returning();
    } else {
      [data] = await db
        .insert(recipes)
        .values({
          authorId: userId,
          desc,
          title,
          recipe,
          ings,
        })
        .returning();
    }
  } catch (error) {
    return { errors: "Fail to create recipe" };
  }

  return { data };
};

export const createNewRecipe = safeAction(CreateRecipeSchema, handler);
