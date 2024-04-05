import React, { useCallback, useEffect, useState } from 'react';
import {
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

import { Model } from '@slavseat/types';

import { login } from '@/shared/api/auth';
import { useAddFacilityMutation } from '@/shared/api/query/facility/add-facility';
import { useRemoveFacilityMutation } from '@/shared/api/query/facility/remove-facility';
import { useUpdateFacilityMutation } from '@/shared/api/query/facility/update-facility';
import { useCreateFloorMutation } from '@/shared/api/query/floor/create-floor';
import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { Button } from '@/shared/components/Button';
import FacilityGridEditor, {
  FacilityGridEditorMode,
} from '@/shared/components/FacilityGridEditor';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import ScrollArea from '@/shared/components/ScrollArea';
import { useInitialize } from '@/shared/hooks/useInitialize';
import { useUserStore } from '@/shared/stores/userStore';
import { hideScrollBar } from '@/shared/styles/global-style.css';
import { cn } from '@/shared/utils/class.util';

import { Box } from '../components/Box';

export function Test() {
  useInitialize();
  const { user } = useUserStore();

  const [editingFloor, setEditingFloor] = useState<number>();
  const [floorName, setFloorName] = useState<string>('');
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

  const { mutate: createFloorMutation } = useCreateFloorMutation({
    onSuccess: () => setFloorName(''),
  });
  const { mutate: addFacilityMutation } = useAddFacilityMutation({});
  const { mutate: updateFacilityMutation } =
    useUpdateFacilityMutation();
  const { mutate: removeFacilityMutation } =
    useRemoveFacilityMutation();

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail } = useGetFloorDetailQuery(
    editingFloor!,
    { enabled: editingFloor !== undefined },
  );
  useEffect(() => {
    if (floorDetail) setEditingFacilities(floorDetail.facilities);
  }, [floorDetail]);

  const handleClickAddFacility = useCallback(() => {
    if (!editingFloor) return;

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
    <div
      className={cn(
        'h-full p-2 space-y-4 overflow-scroll',
        hideScrollBar,
      )}
    >
      <Button
        variant="tertiary"
        onClick={() => login('microsoft')}
        className="block"
      >
        로그인
      </Button>
      <Box title="로그인된 사용자 정보">
        <pre>
          <code className="text-sm">
            {JSON.stringify(user, null, 2)}
          </code>
        </pre>
      </Box>

      <Box title="Floor 추가 폼">
        <input
          className="px-2 py-1 border border-zinc-500 rounded-md text-sm"
          type="text"
          placeholder="Floor 이름"
          onChange={(e) => setFloorName(e.target.value)}
        />
        <Button
          variant="tertiary"
          onClick={() => createFloorMutation({ name: floorName })}
        >
          Floor 추가
        </Button>
      </Box>

      <Box title="Floor 선택">
        <select
          className="border border-neutral-200 rounded text-sm"
          value={editingFloor}
          onChange={(e) =>
            e.target.value && setEditingFloor(Number(e.target.value))
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

      <Box title="Facility Grid Editor Toolbar">
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
            {editorMode} mode
          </Button>
          <Button
            variant="tertiary"
            className="text-sm"
            onClick={() => updateFacilityMutation(editingFacilities)}
          >
            Update Facility
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
            Delete Selected
          </Button>
        </div>
      </Box>

      <ScrollArea
        className={cn(
          'border-dashed border-2 rounded-md border-zinc-500',
        )}
      >
        {floorDetail && (
          <FacilityGridEditor
            mode={editorMode}
            selected={selectedFacility}
            defaultFacilities={floorDetail.facilities}
            facilities={editingFacilities}
            onChange={setEditingFacilities}
            onSelectChange={setSelectedFacility}
          />
        )}
      </ScrollArea>

      <Box title="Facility Grid Viewer" innerPadding={false}>
        <TransformWrapper
          minScale={0.5}
          maxScale={1}
          disablePadding
          centerOnInit
        >
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            wrapperClass="max-w-96 max-h-[50rem]"
          >
            {floorDetail && (
              <FacilityGridViewer
                facilities={floorDetail?.facilities}
                reserves={[]}
              />
            )}
          </TransformComponent>
        </TransformWrapper>
      </Box>
    </div>
  );
}
