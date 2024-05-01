import React, { useCallback, useContext } from 'react';
import { OnDragEndResponder } from 'react-beautiful-dnd';

import { reorder } from '../../utils/array.util';
import { DraggableTableColumn } from './types';

interface DraggableTableContextState {
  data: any[];
  columns: DraggableTableColumn<unknown>[];
  handleDragEnd: OnDragEndResponder;
}

export const DraggableTableContext = React.createContext<DraggableTableContextState>({
  data: [],
  columns: [],
  handleDragEnd: () => {},
});

export interface DraggableTableContextProviderProps extends React.PropsWithChildren {
  data?: DraggableTableContextState['data'];
  columns: DraggableTableContextState['columns'];
  onDragEnd?: (data: DraggableTableContextState['data']) => void;
}

export function DraggableTableContextProvider({
  data = [],
  columns,
  children,
  onDragEnd,
}: DraggableTableContextProviderProps) {
  const handleDragEnd = useCallback<OnDragEndResponder>(
    (result) => {
      const { source, destination } = result;
      if (!data) return;
      // dropped outside the list
      if (!destination || destination.index === source.index) {
        return;
      }
      // no movement
      if (destination.index === source.index) {
        return;
      }

      const reorderedData = reorder(data, source.index, destination.index);

      onDragEnd?.(reorderedData);
    },
    [data, onDragEnd],
  );

  return (
    <DraggableTableContext.Provider value={{ data, columns, handleDragEnd }}>
      {children}
    </DraggableTableContext.Provider>
  );
}

export function useDraggableTableContext() {
  const context = useContext(DraggableTableContext);
  if (!context) throw new Error('Invalid Usage of useDraggableTableContext');

  return context;
}
