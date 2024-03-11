import { Model } from '@slavseat/types';
import { create } from 'zustand';

import { logout } from '@/api/auth';

export interface UserStore {
  user: Model.UserInfo | null;
  logout: () => void;
}

export const userUserStore = create<UserStore>((set) => ({
  user: null,
  logout: async () => {
    await logout();
    set({ user: null });
  },
}));
