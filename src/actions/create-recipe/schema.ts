import { z } from "zod";

export const CreateRecipeSchema = z.object({
  userId: z.string().optional(),
  ings: z.array(z.string()),
  formData: z.custom<FormData>(),
});
