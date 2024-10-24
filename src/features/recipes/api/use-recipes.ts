import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useRecipes = (userId: string) => {
  const query = useQuery({
    enabled: !!userId,
    queryKey: ["own-recipes"],
    queryFn: async () => {
      const response = await client.api.recipes["own-recipes"].$post({
        json: { userId },
      });

      if (!response.ok) throw new Error("Fail to fetch recipes");

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
