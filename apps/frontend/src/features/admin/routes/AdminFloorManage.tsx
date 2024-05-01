import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useUpdateFloorMutation } from '@/shared/api/query/floor/update-floor';
import { useUpdateFloorsMutation } from '@/shared/api/query/floor/update-floors';
import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { cn } from '@/shared/utils/class.util';
import { width } from '@/themes/tokens/width';

import { Box } from '../components/Box';
import { DraggableTable } from '../components/DraggableTable';
import { DraggableTableColumn } from '../components/DraggableTable/types';
import { ManageFloorMenu, ManageFloorMenuActionType } from '../components/Dropdown/ManageFloorMenu';
import { ManageReserveMenu } from '../components/Dropdown/ManageReserveMenu';
import { EditFloorModal } from '../components/Modal/EditFloorModal';
import { useAdminAppStore } from '../stores/adminAppStore';
import { reorder } from '../utils/array.util';

export function AdminFloorManage() {
  const { setTitle } = useAdminAppStore();
  useEffect(() => setTitle('층 관리'), [setTitle]);

  const [floorName, setFloorName] = useState<string>('');
  const [floorEditingData, setFloorEditingData] = useState<Model.FloorSummary[]>([]);
  const [editFloor, setEditFloor] = useState<number>();

  const { mutate: createFloorMutation } = useCreateFloorMutation({
    onSuccess: () => {
      setFloorName('');
      toast.success('추가를 완료했습니다.');
    },
    onError: (e) => toast.error(e.response?.data.message),
  });
  const { mutate: updateFloorsMutation } = useUpdateFloorsMutation({
    onSuccess: () => toast.success('저장은 완료했습니다.'),
    onError: (e) => toast.error(e.response?.data.message),
  });
  const { mutate: updateFloorMutation } = useUpdateFloorMutation({
    onSuccess: () => {
      toast.success('수정을 완료했습니다.');
      setEditFloor(undefined);
    },
    onError: (e) => toast.error(e.response?.data.message),
  });

  const { data: allFloorSummary, isFetching } = useGetAllFloorSummaryQuery();
  useEffect(() => setFloorEditingData(allFloorSummary ?? []), [allFloorSummary]);

  const handleMenuAction = useCallback(
    (action: ManageFloorMenuActionType, item: Model.FloorSummary) => {
      if (action.type === 'edit') {
        setEditFloor(item.id);
      }
      // if (action.type === 'delete') {
      // }
    },
    [],
  );

  const columns: DraggableTableColumn<Model.FloorSummary>[] = useMemo(
    () => [
      { dataKey: 'id', headerContent: 'ID', width: '100px' },
      { dataKey: 'name', headerContent: '이름' },
      {
        dataKey: '',
        headerContent: '',
        renderContent: (item) => (
          <ManageFloorMenu onAction={(action) => handleMenuAction(action, item)} />
        ),
        width: '50px',
      },
    ],
    [handleMenuAction],
  );

  const handlwSubmitOrderChange = useCallback(() => {
    const floors = floorEditingData.map((floor, index) => ({ ...floor, order: index }));

    updateFloorsMutation({ floors });
  }, [floorEditingData, updateFloorsMutation]);

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-4">
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
        <Box title="관리 도구바">
          <Button variant="tertiary" onClick={handlwSubmitOrderChange}>
            순서 변경사항 저장
          </Button>
        </Box>
      </div>

      {isFetching || !floorEditingData ? (
        <Loading />
      ) : (
        <DraggableTable columns={columns} data={floorEditingData} onDragEnd={setFloorEditingData} />
      )}
      {editFloor !== undefined && (
        <EditFloorModal
          floorId={editFloor}
          onClose={() => setEditFloor(undefined)}
          onSubmit={updateFloorMutation}
        />
      )}
    </div>
  );
}
