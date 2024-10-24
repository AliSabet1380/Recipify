import { create } from "zustand";

interface UseNewItem {
  isOpen: boolean;
  userId: string | undefined;
  open: (userId: string) => void;
  close: () => void;
}

export const useNewItem = create<UseNewItem>((set) => ({
  isOpen: false,
  userId: undefined,
  open: (userId) => set({ isOpen: true, userId }),
  close: () => set({ isOpen: false }),
}));
