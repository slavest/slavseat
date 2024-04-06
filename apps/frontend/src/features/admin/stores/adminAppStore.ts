import { create } from 'zustand';

export interface AdminAppStore {
  title: string;
  setTitle: (title: string) => void;
}

export const useAdminAppStore = create<AdminAppStore>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
}));
