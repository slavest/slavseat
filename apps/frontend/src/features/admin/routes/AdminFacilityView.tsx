import React, { useEffect, useState } from 'react';
import {
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';

import { Box } from '../components/Box';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminFacilityView() {
  const { setTitle } = useAdminAppStore();

  useEffect(() => setTitle('Facility 미리보기'), [setTitle]);

  const [viewFloor, setViewFloor] = useState<number>();

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail } = useGetFloorDetailQuery(viewFloor!, {
    enabled: viewFloor !== undefined,
  });
  return (
    <div className="p-4">
      <Box title="Floor 선택">
        <select
          className="border border-neutral-200 rounded text-sm"
          value={viewFloor}
          onChange={(e) =>
            e.target.value && setViewFloor(Number(e.target.value))
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

      {floorDetail && (
        <Box title="Facility Grid 뷰" innerPadding={false}>
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
              <FacilityGridViewer
                facilities={floorDetail?.facilities}
                reserves={[]}
              />
            </TransformComponent>
          </TransformWrapper>
        </Box>
      )}
    </div>
  );
}
