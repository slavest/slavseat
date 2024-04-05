import React from 'react';

export interface GroupContextState {
  depth: number;
}

export const GroupContext = React.createContext<GroupContextState>({
  depth: 1,
});

export interface GroupContextProviderProps extends React.PropsWithChildren {
  depth?: number;
}

export const GroupContextProvider: React.FC<GroupContextProviderProps> = ({
  depth = 1,
  children,
}) => {
  return <GroupContext.Provider value={{ depth }}>{children}</GroupContext.Provider>;
};
