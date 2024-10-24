"use client";

import { useNewRecipe } from "@/features/recipes/hooks/use-new-recipe";

import { Button } from "@/components/ui/button";

import { NewRecipeSheet } from "@/features/recipes/components/new-recipe-sheet";

export const NewRecipe = ({ userId }: { userId: string }) => {
  const { open } = useNewRecipe();

  return (
    <>
      <NewRecipeSheet />
      <Button onClick={() => open(userId)}>Add New+</Button>
    </>
  );
};
