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
      <table className="w-full table-fixed">
        <thead className={cn('bg-neutral-700 text-white')}>
          <tr className={cn('')}>
            {columns.map(({ headerContent, dataKey, renderContent, ...rest }, index) => (
              <th
                key={index}
                className={cn('px-2 py-1 text-left first:rounded-l-lg last:rounded-r-lg')}
                {...rest}
              >
                {headerContent}
              </th>
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
                      className={cn('hover:bg-violet-100', {
                        'table bg-violet-400 text-white': snapshot.isDragging,
                      })}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {columns.map((column, index) => (
                        <td key={index} className="px-2 py-1">
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
