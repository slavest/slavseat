import { useContext } from 'react';

import { GroupContext } from '../context/groupContext';

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (context === undefined)
    throw new Error('Cannot get GroupContext. Check component usage');

  return context;
};
