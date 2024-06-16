import React from 'react';

import { SidebarContextState } from './types';

export const SidebarContext = React.createContext<SidebarContextState>({
  location: undefined,
  onLocationChange: () => {},
});

export interface SidebarContextProviderProps extends SidebarContextState {
  children?: React.ReactNode;
}
export function SidebarContextProvider({ children, ...rest }: SidebarContextProviderProps) {
  return <SidebarContext.Provider value={{ ...rest }}>{children}</SidebarContext.Provider>;
}

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  if (!context) throw Error('Invalid Usage of useSidebarContext');

  return context;
};
