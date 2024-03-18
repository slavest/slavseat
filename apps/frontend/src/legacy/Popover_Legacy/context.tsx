import React, { useEffect, useState } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';

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
    setAnchorEl: (el: HTMLElement | null) => {},
  });

export interface PopoverProviderProps
  extends Pick<Partial<PopoverContextState>, 'open' | 'anchorEl'> {
  children?: React.ReactNode;
}
export const PopoverContextProvider = ({
  open: openProp,
  anchorEl: anchorElProp,
  children,
}: PopoverProviderProps) => {
  const [open, setOpen] = useControlled(false, openProp);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
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
