import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useSingleRecipe = (recipeId: string) => {
  const query = useQuery({
    enabled: !!recipeId,
    gcTime: 0,
    staleTime: 0,
    queryKey: ["single-recipe"],
    queryFn: async () => {
      const response = await client.api.recipes.recipe[":recipeId"].$get({
        param: { recipeId },
      });

      if (!response.ok) throw new Error((await response.json()).error);

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
