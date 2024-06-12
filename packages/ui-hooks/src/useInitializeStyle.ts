import { useEffect, useState } from 'react';

import { baseTokenClass, lightThemeClass } from '@slavseat/ui-themes';

export const useInitializeStyle = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    document.body.classList.add(baseTokenClass);
    document.body.classList.add(lightThemeClass);
    setInitialized(true);
  }, []);

  return { initialized };
};
