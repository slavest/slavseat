import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { DraggableTableContext, DraggableTableContextProvider, DraggableTableContextProviderProps } from '../context';

interface RootProps
  extends DraggableTableContextProviderProps,
    Omit<React.HTMLAttributes<HTMLTableElement>, keyof DraggableTableContextProviderProps> {}

export function Root({ data, onDragEnd, ...rest }: RootProps) {
  return (
    <DraggableTableContextProvider data={data} onDragEnd={onDragEnd}>
      <DraggableTableContext.Consumer>
        {(context) =>
      <DragDropContext onDragEnd={context.} >
        <table {...rest} />
      </DragDropContext>
      }
      </DraggableTableContext.Consumer>
    </DraggableTableContextProvider>
  );
}
