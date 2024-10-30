import { z } from "zod";

export const EditSchema = z.object({
  formData: z.custom<FormData>(),
});

export const validateFormData = z.object({
  id: z.string(),
  avatar: z.custom<File>().optional(),
  username: z.string().trim().optional(),
  oldPassword: z.string().optional(),
  newPassword: z.string().trim().optional(),
});
