import { z } from "zod";

import { ActionState } from "@/actions/safe-action";

import { CreateRecipeSchema } from "@/actions/create-recipe/schema";

import { Recipe } from "@/db/schema";

export type InputType = z.infer<typeof CreateRecipeSchema>;
export type ReturnType = ActionState<InputType, Recipe>;
