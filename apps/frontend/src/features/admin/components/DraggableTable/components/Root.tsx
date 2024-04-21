import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { DraggableTableContextProvider, DraggableTableContextProviderProps } from '../context';

interface RootProps
  extends DraggableTableContextProviderProps,
    Omit<React.HTMLAttributes<HTMLTableElement>, keyof DraggableTableContextProviderProps> {}

export function Root({ data, onDragEnd, ...rest }: RootProps) {
  return (
    <DraggableTableContextProvider data={data} onDragEnd={}>
      <DragDropContext>
        <table {...rest} />
      </DragDropContext>
    </DraggableTableContextProvider>
  );
}
