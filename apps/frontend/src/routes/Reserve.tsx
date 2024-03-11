import React, { useCallback, useState } from 'react';

import { Model } from '@slavseat/types';

import { useAddFacilityMutation } from '@/api/query/facility/add-facility';
import { useUpdateFacilityMutation } from '@/api/query/facility/update-facility';
import { useCreateFloorMutation } from '@/api/query/floor/create-floor';
import { useGetAllFloorSummaryQuery } from '@/api/query/floor/get-all-floor-summary';
import { useGetFLoorDetailQuery } from '@/api/query/floor/get-floor-detail';
import { PlusIcon } from '@/assets/icons/Plus';
import { Badge, Status } from '@/components/atoms/Badge';
import { Box } from '@/components/atoms/Box';
import { Button } from '@/components/atoms/Button';
import FacilityGridEditor from '@/components/molecules/FacilityGridEditor';
import FacilityGridViewer from '@/components/molecules/FacilityGridViewer';

export function Reserve() {
  const { mutate: createFloorMutation } = useCreateFloorMutation();
  const { mutate: addFacilityMutation } = useAddFacilityMutation();
  const { mutate: updateFacilityMutation } =
    useUpdateFacilityMutation();

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail } = useGetFLoorDetailQuery(1);

  const [facilityType, setFacilityType] =
    useState<Model.FacilityType>(Model.FacilityType.NONE);
  const [facilityName, setFacilityName] = useState('');

  const [editingFacilities, setEditingFacilities] = useState<
    Model.FacilitySummary[]
  >([]);

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
      <Button
        onClick={() => createFloorMutation({ name: 'floor-1' })}
      >
        Floor 추가
      </Button>
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
      {/* <pre>
        <code>{JSON.stringify(allFloorSummary, null, 2)}</code>
      </pre> */}
      {/* <Badge status={Status.ABLE_RESERVE} /> */}
      {floorDetail && (
        <FacilityGridViewer
          facilities={floorDetail?.facilities}
          reserves={[]}
        />
      )}
      <Button
        onClick={() => updateFacilityMutation(editingFacilities)}
      >
        Update Facility
      </Button>
      {floorDetail && (
        <FacilityGridEditor
          facilities={floorDetail?.facilities}
          onChange={setEditingFacilities}
        />
      )}
    </>
  );
}
