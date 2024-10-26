"use client";

import { Loading } from "@/components/ui-pages/loading";
import { NotFoundPage } from "@/components/ui-pages/not-found";
import { useSingleRecipe } from "@/features/recipes/api/use-single-recipe";

const Recipe = ({
  params: { recipeId },
}: {
  params: { recipeId: string[] };
}) => {
  const { data: recipe, isLoading } = useSingleRecipe(recipeId[0]);

  if (isLoading) return <Loading />;
  if (!isLoading && !recipe) return <NotFoundPage />;

  return <>{recipe?.title}</>;
};

export default Recipe;
