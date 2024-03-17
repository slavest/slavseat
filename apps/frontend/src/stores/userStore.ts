import { Model } from '@slavseat/types';
import { create } from 'zustand';

import { logout } from '@/api/auth';

export interface UserStore {
  user: Model.UserInfo | null;
  setUser: (user: Model.UserInfo | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    await logout();
    set({ user: null });
  },
}));
