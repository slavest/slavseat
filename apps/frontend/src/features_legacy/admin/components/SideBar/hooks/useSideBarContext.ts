import { useContext } from 'react';

import { SideBarContext } from '../context/sideBarContext';

export const useSideBarContext = () => {
  const context = useContext(SideBarContext);
  if (context === undefined)
    throw new Error(
      'Cannot get SideBarContext. Check component usage',
    );

  return context;
};
