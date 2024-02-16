import React, { useEffect, useState } from 'react';

import { useControlled } from '@/hooks/useControlled';

interface PopoverContextState {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
}

export const PopoverContext =
  React.createContext<PopoverContextState>({
    open: false,
    handleOpen: () => {},
    handleClose: () => {},
    anchorEl: null,
    setAnchorEl: () => {},
  });

export interface PopoverProviderProps
  extends Pick<Partial<PopoverContextState>, 'open' | 'anchorEl'> {
  onOpen?: (open: boolean) => void;
  children?: React.ReactNode;
}
export const PopoverContextProvider = ({
  open: openProp,
  anchorEl: anchorElProp,
  children,
  onOpen,
}: PopoverProviderProps) => {
  const [open, setOpen] = useControlled(false, openProp);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = () => {
    onOpen?.(true);
    setOpen(true);
  };
  const handleClose = () => {
    onOpen?.(false);
    setOpen(false);
  };

  return (
    <PopoverContext.Provider
      value={{
        open,
        handleOpen,
        handleClose,
        get anchorEl() {
          return anchorElProp ?? anchorEl;
        },
        setAnchorEl,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (context === undefined) {
    throw new Error(
      'usePopoverContext must be used within a PopoverProvider',
    );
  }
  return context;
};
