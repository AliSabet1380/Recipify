import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type Req = InferRequestType<
  (typeof client.api.recipes.recipe)[":recipeId"]["$delete"]
>["param"];
type Res = InferResponseType<
  (typeof client.api.recipes.recipe)[":recipeId"]["$delete"],
  200
>;

export const useDeleteRecipe = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutate = useMutation<Res, Error, Req>({
    mutationFn: async (param) => {
      const response = await client.api.recipes.recipe[":recipeId"].$delete({
        param,
      });

      if (!response.ok) throw new Error((await response.json()).error);

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["recipes", "recipe"],
        stale: false,
      });
      toast({
        description: "Recipe deleted successfully",
      });

      router.push("/dashboard", { scroll: true });
    },
    onError: (err) => {
      toast({
        description: err.message,
      });
    },
  });

  return mutate;
};
