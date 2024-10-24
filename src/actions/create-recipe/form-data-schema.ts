import { z } from "zod";

export const FormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 chars")
    .max(15, "Title can not be more than 15 chars"),
  desc: z
    .string()
    .trim()
    .min(3, "Descriprion must be at least 3 chars")
    .max(50, "Description can not be more than 50 chars"),
  recipe: z
    .string()
    .trim()
    .min(3, "Recipe must be at least 3 chars")
    .max(250, "Recipe is too long"),
});

export type FormType = z.infer<typeof FormSchema>;
