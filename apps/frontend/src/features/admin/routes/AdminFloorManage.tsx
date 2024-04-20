import React, { useCallback, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';

import { useCreateFloorMutation } from '@/shared/api/query/floor/create-floor';
import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useUpdateFloorsMutation } from '@/shared/api/query/floor/update-floors';
import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { cn } from '@/shared/utils/class.util';

import { Box } from '../components/Box';
import { useAdminAppStore } from '../stores/adminAppStore';
import { reorder } from '../utils/array.util';

export function AdminFloorManage() {
  const { setTitle } = useAdminAppStore();
  useEffect(() => setTitle('층 관리'), [setTitle]);

  const [floorName, setFloorName] = useState<string>('');
  // const [floorOrder, setFloorOrder] = useState<Model.FloorSummary[]>([]);

  const { mutate: createFloorMutation } = useCreateFloorMutation({
    onSuccess: () => {
      setFloorName('');
      toast.success('추가를 완료했습니다.');
    },
    onError: (e) => toast.error(e.response?.data.message),
  });

  const { data: allFloorSummary, isFetching } = useGetAllFloorSummaryQuery();
  const { mutate: updateFloorsMutation } = useUpdateFloorsMutation();
  // useEffect(() => setFloorOrder(allFloorSummary ?? []), [allFloorSummary]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;
      // dropped outside the list
      if (!destination || destination.index === source.index) {
        return;
      }

      // no movement
      if (destination.index === source.index) {
        return;
      }

      if (!allFloorSummary) return;

      const floors = reorder(allFloorSummary, source.index, destination.index).map(
        (floor, index) => ({ ...floor, order: index }),
      );

      updateFloorsMutation({ floors });
    },
    [allFloorSummary, updateFloorsMutation],
  );

  return (
    <div className="p-4">
      <Box title="Floor 리스트">
        <pre>{JSON.stringify(allFloorSummary, null, 2)}</pre>
      </Box>

      <Box title="Floor 추가 폼">
        <input
          className="rounded-md border border-zinc-500 px-2 py-1 text-sm"
          placeholder="Floor 이름"
          type="text"
          onChange={(e) => setFloorName(e.target.value)}
        />
        <Button variant="tertiary" onClick={() => createFloorMutation({ name: floorName })}>
          Floor 추가
        </Button>
      </Box>

      <Box title="Floor 수정">
        {isFetching || !allFloorSummary ? (
          <Loading />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                </tr>
              </thead>
              <Droppable droppableId="table">
                {(droppableProvided: DroppableProvided) => (
                  <tbody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                    {allFloorSummary
                      .sort((a, b) => a.order - b.order)
                      .map((floor, index) => (
                        <Draggable key={floor.id} draggableId={floor.id.toString()} index={index}>
                          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <tr
                              ref={provided.innerRef}
                              className={cn({ 'bg-blue-400': snapshot.isDragging })}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <td>{floor.id}</td>
                              <td>{floor.name}</td>
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
        )}
      </Box>
    </div>
  );
}
