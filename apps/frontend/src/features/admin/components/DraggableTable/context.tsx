import React, { useCallback, useContext } from 'react';
import { OnDragEndResponder } from 'react-beautiful-dnd';

import { DraggableTableColumn } from './types';

interface DraggableTableContextState {
  data: any[];
  columns: DraggableTableColumn<unknown>[];
  onDragEnd: OnDragEndResponder;
}

export const DraggableTableContext = React.createContext<DraggableTableContextState>({
  data: [],
  columns: [],
  onDragEnd: () => {},
});

export interface DraggableTableContextProviderProps extends React.PropsWithChildren {
  data?: DraggableTableContextState['data'];
  columns: DraggableTableContextState['columns'];
}

export function DraggableTableContextProvider({
  data = [],
  columns,
  children,
}: DraggableTableContextProviderProps) {
  const handleDragEnd = useCallback(() => {});

  return (
    <DraggableTableContext.Provider value={{ data, columns }}>
      {children}
    </DraggableTableContext.Provider>
  );
}

export function useDraggableTableContext() {
  const context = useContext(DraggableTableContext);
  if (!context) throw new Error('Invalid Usage of useDraggableTableContext');

  return context;
}
