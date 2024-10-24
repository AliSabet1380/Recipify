import { create } from "zustand";

interface UseNewRecipe {
  isOpen: boolean;
  userId: string | undefined;
  open: (userId: string) => void;
  close: () => void;
}

export const useNewRecipe = create<UseNewRecipe>((set) => ({
  isOpen: false,
  userId: undefined,
  open: (userId) => set({ isOpen: true, userId }),
  close: () => set({ isOpen: false }),
}));
