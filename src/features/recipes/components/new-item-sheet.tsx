"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewItem } from "@/features/recipes/hooks/use-new-item";

export const NewItemSheet = () => {
  const { isOpen, close } = useNewItem();

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>New Recipe</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/* Form Here */}
      </SheetContent>
    </Sheet>
  );
};
