import React, { useCallback, useEffect, useState } from 'react';

import { Model } from '@slavseat/types';

import { login } from '@/api/auth';
import { useAddFacilityMutation } from '@/api/query/facility/add-facility';
import { useRemoveFacilityMutation } from '@/api/query/facility/remove-facility';
import { useUpdateFacilityMutation } from '@/api/query/facility/update-facility';
import { useCreateFloorMutation } from '@/api/query/floor/create-floor';
import { useGetAllFloorSummaryQuery } from '@/api/query/floor/get-all-floor-summary';
import { useGetFLoorDetailQuery } from '@/api/query/floor/get-floor-detail';
import { Box } from '@/components/atoms/Box';
import { Button } from '@/components/atoms/Button';
import FacilityGridEditor, {
  FacilityGridEditorMode,
} from '@/components/molecules/FacilityGridEditor';
import FacilityGridViewer from '@/components/molecules/FacilityGridViewer';

export function Test() {
  const { mutate: createFloorMutation } = useCreateFloorMutation();
  const { mutate: addFacilityMutation } = useAddFacilityMutation();
  const { mutate: updateFacilityMutation } =
    useUpdateFacilityMutation();
  const { mutate: removeFacilityMutation } =
    useRemoveFacilityMutation();

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail } = useGetFLoorDetailQuery(1);

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

  useEffect(() => {
    if (floorDetail) setEditingFacilities(floorDetail.facilities);
  }, [floorDetail]);

  const handleClickAddFacility = useCallback(() => {
    addFacilityMutation({
      floorId: 1,
      facilities: [
        {
          type: facilityType,
          name: facilityName,
          w: 1,
          h: 1,
          x: 0,
          y: 0,
        },
      ],
    });
  }, [addFacilityMutation, facilityName, facilityType]);

  return (
    <>
      <Button onClick={() => login('microsoft')}>로그인</Button>
      <input
        type="text"
        onChange={(e) => setFloorName(e.target.value)}
      />
      <Button
        onClick={() => createFloorMutation({ name: floorName })}
      >
        Floor 추가
      </Button>
      <pre>
        <code>{JSON.stringify(allFloorSummary, null, 2)}</code>
      </pre>
      <Box>
        <input onChange={(e) => setFacilityName(e.target.value)} />
        <select
          className="w-full border border-neutral-200 rounded text-sm"
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
        <Button onClick={handleClickAddFacility}>Seat 추가</Button>
      </Box>
      <pre>
        <code>{JSON.stringify(floorDetail, null, 2)}</code>
      </pre>
      {/* <Badge status={Status.ABLE_RESERVE} /> */}
      {floorDetail && (
        <FacilityGridViewer
          facilities={floorDetail?.facilities}
          reserves={[]}
        />
      )}
      <div className="space-x-2">
        <Button
          onClick={() =>
            setEditorMode((prev) =>
              prev === 'edit' ? 'select' : 'edit',
            )
          }
        >
          {editorMode} mode
        </Button>
        <Button
          onClick={() => updateFacilityMutation(editingFacilities)}
        >
          Update Facility
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            removeFacilityMutation(selectedFacility.map((v) => v.id))
          }
        >
          Delete Selected
        </Button>
      </div>
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
    </>
  );
}
