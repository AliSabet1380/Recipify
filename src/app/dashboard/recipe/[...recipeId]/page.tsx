"use client";

import { Loader2 } from "lucide-react";

import { useSingleRecipe } from "@/features/recipes/api/use-single-recipe";

const Recipe = ({
  params: { recipeId },
}: {
  params: { recipeId: string[] };
}) => {
  const { data: recipe, isLoading } = useSingleRecipe(recipeId[0]);

  return <></>;
};

export default Recipe;
