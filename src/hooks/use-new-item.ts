import { create } from "zustand";

interface UseNewItem {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useNewItem = create<UseNewItem>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
