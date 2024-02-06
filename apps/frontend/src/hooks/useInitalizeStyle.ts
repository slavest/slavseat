import { useEffect, useState } from 'react';

import { useThemeStore } from '@/stores/themeStore';
import {
  baseTokenClass,
  darkThemeClass,
  lightThemeClass,
} from '@/themes/theme.css';

export const useInitalizeStyle = () => {
  const [initalized, setInitalized] = useState(false);

  useEffect(() => {
    document.body.classList.add(baseTokenClass);
    document.body.classList.add(lightThemeClass);
    setInitalized(true);
  }, []);

  return { initalized };
};
