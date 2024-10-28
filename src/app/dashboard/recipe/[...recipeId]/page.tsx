"use client";

import Image from "next/image";

import { Loading } from "@/components/ui-pages/loading";
import { NotFoundPage } from "@/components/ui-pages/not-found";

import { useSingleRecipe } from "@/features/recipes/api/use-single-recipe";
import { SingleRecipe } from "@/components/dashboard/single-recipe";

const Recipe = ({
  params: { recipeId },
}: {
  params: { recipeId: string[] };
}) => {
  const { data: recipe, isLoading } = useSingleRecipe(recipeId[0]);

  if (isLoading) return <Loading />;
  if (!recipe) return <NotFoundPage />;

  return <SingleRecipe {...recipe} />;
};

export default Recipe;
