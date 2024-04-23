import React, { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';

import { cn } from '@/shared/utils/class.util';

import { reorder } from '../../utils/array.util';
import { DraggableTableColumn } from './types';

interface DraggableTableProps<T> {
  data: T[];
  columns: DraggableTableColumn<T>[];
  onDragEnd?: (data: T[]) => void;
}

export function DraggableTable<T extends Record<string, any>>({
  data,
  columns,
  onDragEnd,
}: DraggableTableProps<T>) {
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.headerContent}</th>
            ))}
          </tr>
        </thead>
        <Droppable droppableId="table">
          {(droppableProvided) => (
            <tbody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {data?.map((item, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided, snapshot) => (
                    <tr
                      ref={provided.innerRef}
                      className={cn({ 'table bg-blue-400': snapshot.isDragging })}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {columns.map((column, index) => (
                        <td key={index}>
                          {column.renderContent
                            ? column.renderContent(item)
                            : item[column.dataKey.toString()]}
                        </td>
                      ))}
                    </tr>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
}
