"use client";

import { useNewItem } from "@/features/recipes/hooks/use-new-item";

import { Button } from "@/components/ui/button";
import { NewItemSheet } from "@/features/recipes/components/new-item-sheet";

export const NewItem = ({ userId }: { userId: string }) => {
  const { open } = useNewItem();

  return (
    <>
      <NewItemSheet />
      <Button onClick={() => open(userId)}>Add New+</Button>
    </>
  );
};
