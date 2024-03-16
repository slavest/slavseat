import React, { useCallback, useEffect, useState } from 'react';

import { Model } from '@slavseat/types';
import { clsx } from 'clsx';

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
import { hideScrollBar } from '@/global-style.css';

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
    <div
      className={clsx(
        'h-full p-2 space-y-4 overflow-scroll',
        hideScrollBar,
      )}
    >
      <Button onClick={() => login('microsoft')} className="block">
        로그인
      </Button>
      <div>
        <div className="text-zinc-500 text-sm">Floor 추가 폼</div>
        <div className="inline-block p-4 border-dashed border-2 rounded-md border-zinc-500 space-x-2">
          <input
            className="px-2 py-1 border border-zinc-500 rounded-md text-sm"
            type="text"
            placeholder="Floor 이름"
            onChange={(e) => setFloorName(e.target.value)}
          />
          <Button
            className="ml-auto mr-0"
            onClick={() => createFloorMutation({ name: floorName })}
          >
            Floor 추가
          </Button>
        </div>
      </div>
      {/* <pre>
        <code>{JSON.stringify(allFloorSummary, null, 2)}</code>
      </pre> */}
      <div>
        <div className="text-zinc-500 text-sm">Facility 추가 폼</div>
        <div className="inline-flex gap-2 items-center p-4 border-dashed border-2 rounded-md border-zinc-500 ">
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
            className="my-auto"
            onClick={handleClickAddFacility}
          >
            Seat 추가
          </Button>
        </div>
      </div>
      {/* <pre>
        <code>{JSON.stringify(floorDetail, null, 2)}</code>
      </pre> */}
      {/* <Badge status={Status.ABLE_RESERVE} /> */}

      <div>
        <div className="text-zinc-500 text-sm">
          Facility Grid Viewer
        </div>
        <div
          className={clsx(
            'border-dashed border-2 rounded-md border-zinc-500 overflow-scroll',
            hideScrollBar,
          )}
        >
          {floorDetail && (
            <FacilityGridViewer
              facilities={floorDetail?.facilities}
              reserves={[]}
            />
          )}
        </div>
      </div>

      <div>
        <div className="text-zinc-500 text-sm">
          Facility Grid Editor Toolbar
        </div>
        <div className="p-2 border-dashed border-2 rounded-md border-zinc-500">
          <div className="space-x-2">
            <Button
              className="text-sm"
              size="sm"
              onClick={() =>
                setEditorMode((prev) =>
                  prev === 'edit' ? 'select' : 'edit',
                )
              }
            >
              {editorMode} mode
            </Button>
            <Button
              className="text-sm"
              size="sm"
              onClick={() =>
                updateFacilityMutation(editingFacilities)
              }
            >
              Update Facility
            </Button>
            <Button
              className="text-sm"
              size="sm"
              variant="outlined"
              onClick={() =>
                removeFacilityMutation(
                  selectedFacility.map((v) => v.id),
                )
              }
            >
              Delete Selected
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="text-zinc-500 text-sm">
          Facility Grid Editor
        </div>
        <div
          className={clsx(
            'w-96 h-[50rem] border-dashed border-2 rounded-md border-zinc-500 overflow-scroll',
            hideScrollBar,
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
        </div>
      </div>
    </div>
  );
}
