import { z } from "zod";

export const CreateRecipeSchema = z.object({
  userId: z.string(),
  title: z.string(),
  desc: z.string(),
  ing: z.string().optional(),
  recipe: z.string(),
  coverImg: z.custom<File>().optional(),
});
