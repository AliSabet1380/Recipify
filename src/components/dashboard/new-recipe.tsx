"use client";

import { useNewItem } from "@/features/recipes/hooks/use-new-recipe";

import { Button } from "@/components/ui/button";
import { NewRecipeSheet } from "@/features/recipes/components/new-recipe-sheet";

export const NewItem = ({ userId }: { userId: string }) => {
  const { open } = useNewItem();

  return (
    <>
      <NewRecipeSheet />
      <Button onClick={() => open(userId)}>Add New+</Button>
    </>
  );
};
