import React, { useCallback } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';

import { SideBarItem } from '../components/Item';

export interface SideBarContextState {
  activated: string | undefined;
  itemClickHandler: (item: SideBarItem) => void;
}

export const SideBarContext =
  React.createContext<SideBarContextState>({
    activated: undefined,
    itemClickHandler: () => {},
  });

export interface SideBarContextProviderProps
  extends React.PropsWithChildren {
  activated?: string;
  onItemClick?: (item: SideBarItem) => void;
}

export const SideBarContextProvider: React.FC<
  SideBarContextProviderProps
> = ({ activated: activatedProps, onItemClick, children }) => {
  const [activated, setActivated] = useControlled(
    undefined,
    activatedProps,
  );

  const handleItemClick = useCallback(
    (item: SideBarItem) => {
      if (onItemClick === undefined) setActivated(item.value);
      onItemClick?.(item);
    },
    [onItemClick, setActivated],
  );

  return (
    <SideBarContext.Provider
      value={{ activated, itemClickHandler: handleItemClick }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
