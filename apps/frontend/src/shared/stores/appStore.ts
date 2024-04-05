import { create } from "zustand";

export interface AppStore {
  isPWA: boolean;
  setIsPwa: (value: boolean) => void;
}

export const useAppStore = create<>()
