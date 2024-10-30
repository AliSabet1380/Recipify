import { z } from "zod";

import { User } from "@/db/schema";

import { ActionState } from "@/actions/safe-action";
import { EditSchema } from "@/actions/edit-profile/schema";

export type InputType = z.infer<typeof EditSchema>;
export type ReturnType = ActionState<InputType, Omit<User, "password">>;
