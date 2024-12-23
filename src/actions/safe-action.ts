import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  errors?: string;
  data?: TOutput;
};

export const safeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validateData = schema.safeParse(data);

    if (!validateData.success) {
      return {
        fieldErrors: validateData.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validateData.data);
  };
};
