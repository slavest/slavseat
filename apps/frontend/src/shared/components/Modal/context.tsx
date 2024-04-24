import React, { createContext, useCallback } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';

export interface ModalContextState {
  open: boolean;
  closeOnBackdropClick: boolean;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextState>({
  open: false,
  closeOnBackdropClick: false,
  closeModal: () => {},
});

export interface ModalContextProviderProps extends React.PropsWithChildren {
  open?: boolean;
  closeOnBackdropClick?: boolean;
  onClose?: () => void;
}

export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  open: openProps,
  closeOnBackdropClick = true,
  onClose,
  children,
}) => {
  const [open, setOpen] = useControlled(false, openProps);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
    onClose?.();
    console.log('close');
  }, [onClose, setOpen]);

  return (
    <ModalContext.Provider
      value={{
        open,
        closeOnBackdropClick,
        closeModal: handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
