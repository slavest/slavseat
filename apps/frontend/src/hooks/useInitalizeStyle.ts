import { useEffect, useState } from 'react';

import { useThemeStore } from '@/stores/themeStore';
import {
  baseTokenClass,
  darkThemeClass,
  lightThemeClass,
} from '@/themes/theme.css';

export const useInitalizeStyle = () => {
  const { darkMode } = useThemeStore();
  const [initalized, setInitalized] = useState(false);

  useEffect(() => {
    document.body.classList.add(baseTokenClass);
    if (darkMode) {
      document.body.classList.remove(lightThemeClass);
      document.body.classList.add(darkThemeClass);
    } else {
      document.body.classList.remove(darkThemeClass);
      document.body.classList.add(lightThemeClass);
    }
    setInitalized(true);
  }, [darkMode]);

  return { initalized };
};
