import { create } from 'zustand';

import { darkThemeClass, lightThemeClass } from '@/themes/theme.css';

export interface ThemeStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const newState = { darkMode: !state.darkMode };

      if (newState.darkMode) {
        document.body.classList.remove(lightThemeClass);
        document.body.classList.add(darkThemeClass);
      } else {
        document.body.classList.remove(darkThemeClass);
        document.body.classList.add(lightThemeClass);
      }

      return newState;
    }),
}));
