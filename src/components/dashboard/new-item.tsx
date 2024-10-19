"use client";

import { useNewItem } from "@/hooks/use-new-item";

import { Button } from "@/components/ui/button";
import { NewItemSheet } from "@/features/dashboard/components/new-item-sheet";

export const NewItem = () => {
  const { open } = useNewItem();

  return (
    <>
      <NewItemSheet />
      <Button onClick={open}>Add New+</Button>
    </>
  );
};
