import { useContext } from 'react';

import { ModalContext } from '../context';

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) throw new Error('Cannot get ModalContext. Check component usage');

  return context;
};
