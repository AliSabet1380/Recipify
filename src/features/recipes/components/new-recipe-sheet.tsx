"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useNewItem } from "@/features/recipes/hooks/use-new-recipe";
import { NewRecipeForm } from "@/features/recipes/components/new-recipe-Form";

export const NewRecipeSheet = () => {
  const { isOpen, close } = useNewItem();

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="overflow-y-scroll" side={"right"}>
        <SheetHeader>
          <SheetTitle>New Recipe</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <NewRecipeForm />
      </SheetContent>
    </Sheet>
  );
};
