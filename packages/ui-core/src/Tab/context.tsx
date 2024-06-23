import React, { useCallback, useContext } from 'react';

import { useControlled } from '@slavseat/ui-hooks';

interface TabContextState {
  openId?: string;
  onOpenChange: (openId?: string) => void;
}

export const TabContext = React.createContext<TabContextState>({
  openId: undefined,
  onOpenChange: () => {},
});

export interface TabContextProviderProps extends Partial<TabContextState>, React.PropsWithChildren {
  defaultOpenId?: string;
}

export function TabContextProvider({
  openId: openIdProp,
  defaultOpenId,
  children,
  onOpenChange,
}: TabContextProviderProps) {
  const [openId, setOpenId] = useControlled(defaultOpenId, openIdProp);

  const handleOpenChange = useCallback<TabContextState['onOpenChange']>(
    (value) => {
      setOpenId(value);
      onOpenChange?.(value);
    },
    [onOpenChange, setOpenId],
  );

  return (
    <TabContext.Provider value={{ openId, onOpenChange: handleOpenChange }}>
      {children}
    </TabContext.Provider>
  );
}

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('Invalid useTabContext usage');

  return context;
};
