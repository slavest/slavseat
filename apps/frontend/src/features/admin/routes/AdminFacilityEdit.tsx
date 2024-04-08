import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';

import { useAddFacilityMutation } from '@/shared/api/query/facility/add-facility';
import { useRemoveFacilityMutation } from '@/shared/api/query/facility/remove-facility';
import { useUpdateFacilityMutation } from '@/shared/api/query/facility/update-facility';
import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { Button } from '@/shared/components/Button';
import FacilityGridEditor, {
  FacilityGridEditorMode,
} from '@/shared/components/FacilityGridEditor';
import ScrollArea from '@/shared/components/ScrollArea';
import { cn } from '@/shared/utils/class.util';

import { Box } from '../components/Box';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminFacilityEdit() {
  const { setTitle } = useAdminAppStore();
  useEffect(() => setTitle('Facility 관리'), [setTitle]);

  const [editingFloor, setEditingFloor] = useState<number>();
  const [editorMode, setEditorMode] =
    useState<FacilityGridEditorMode>('edit');
  const [selectedFacility, setSelectedFacility] = useState<
    Model.FacilitySummary[]
  >([]);
  const [facilityType, setFacilityType] =
    useState<Model.FacilityType>(Model.FacilityType.NONE);
  const [facilityName, setFacilityName] = useState('');
  const [editingFacilities, setEditingFacilities] = useState<
    Model.FacilitySummary[]
  >([]);

  const { mutate: addFacilityMutation } = useAddFacilityMutation({
    onSuccess: () => toast.success('추가를 완료했습니다.'),
    onError: (e) => toast.error(e.response?.data?.message),
  });
  const { mutate: updateFacilityMutation } =
    useUpdateFacilityMutation({
      onSuccess: () => toast.success('저장을 완료했습니다.'),
      onError: (e) => toast.error(e.response?.data?.message),
    });
  const { mutate: removeFacilityMutation } =
    useRemoveFacilityMutation({
      onSuccess: () => toast.success('삭제를 완료했습니다.'),
      onError: (e) => toast.error(e.response?.data?.message),
    });

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail } = useGetFloorDetailQuery(
    editingFloor!,
    { enabled: editingFloor !== undefined },
  );
  useEffect(() => {
    if (floorDetail) setEditingFacilities(floorDetail.facilities);
  }, [floorDetail]);

  const handleClickAddFacility = useCallback(() => {
    if (!editingFloor) {
      toast.error('Facility를 추가할 층을 선택해 주세요');
      return;
    }

    addFacilityMutation({
      floorId: editingFloor,
      facilities: [
        {
          type: facilityType,
          name: facilityName,
          w: 2,
          h: 2,
          x: 0,
          y: 0,
        },
      ],
    });
  }, [addFacilityMutation, facilityName, facilityType, editingFloor]);

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <Box title="Floor 선택">
          <select
            className="border border-neutral-200 rounded text-sm"
            value={editingFloor}
            onChange={(e) =>
              e.target.value &&
              setEditingFloor(Number(e.target.value))
            }
          >
            <option value="" key="">
              층을 선택해 주세요
            </option>
            {allFloorSummary?.map((floor) => (
              <option value={floor.id} key={floor.id}>
                {floor.name}
              </option>
            ))}
          </select>
        </Box>

        <Box title="Facility 추가 폼">
          <div className="inline-flex flex-col my-auto">
            <input
              placeholder="Facility 이름"
              onChange={(e) => setFacilityName(e.target.value)}
              className="px-2 py-1 border border-zinc-500 rounded-md text-sm"
            />
            <select
              className="border border-neutral-200 rounded text-sm"
              value={facilityType}
              onChange={(e) => {
                setFacilityType(
                  Number(e.target.value) as Model.FacilityType,
                );
              }}
            >
              <option value={Model.FacilityType.MEETING_ROOM}>
                회의실
              </option>
              <option value={Model.FacilityType.SEAT}>좌석</option>
              <option value={Model.FacilityType.NONE}>기타</option>
            </select>
          </div>
          <Button
            variant="tertiary"
            className="my-auto"
            onClick={handleClickAddFacility}
          >
            Facility 추가
          </Button>
        </Box>

        <Box title="Facility Grid 에디터 툴바">
          <div className="space-x-2">
            <Button
              variant="tertiary"
              className="text-sm"
              onClick={() =>
                setEditorMode((prev) =>
                  prev === 'edit' ? 'select' : 'edit',
                )
              }
            >
              모드 전환 ({editorMode})
            </Button>
            <Button
              variant="tertiary"
              className="text-sm"
              onClick={() =>
                updateFacilityMutation(editingFacilities)
              }
            >
              Facility 저장
            </Button>
            <Button
              variant="tertiary"
              className="text-sm"
              onClick={() =>
                removeFacilityMutation(
                  selectedFacility.map((v) => v.id),
                )
              }
            >
              선택된 Facility 삭제
            </Button>
          </div>
        </Box>
      </div>

      {floorDetail && (
        <ScrollArea
          className={cn(
            'mt-4 border-dashed border-2 rounded-md border-zinc-500 max-w-full',
          )}
        >
          <FacilityGridEditor
            mode={editorMode}
            selected={selectedFacility}
            defaultFacilities={floorDetail.facilities}
            facilities={editingFacilities}
            onChange={setEditingFacilities}
            onSelectChange={setSelectedFacility}
          />
        </ScrollArea>
      )}
    </div>
  );
}
