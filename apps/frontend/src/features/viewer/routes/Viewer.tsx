import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { formatDate } from 'date-fns';

import { getFloorDetail } from '@/shared/api/floor';
import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { DateSelector } from '@/shared/components/DateSelector';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import { Loading } from '@/shared/components/Loading';
import { Tab } from '@/shared/components/Tab';

import { Refresh } from '../components/Refresh';

function Viewer() {
  const [searchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const defaultFloor = searchParams.get('floor');

  const queryClinet = useQueryClient();

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail, isLoading: isFloorDetailLoading } = useGetFloorDetailQuery(
    selectedFloor!,
    {
      enabled: selectedFloor !== null,
    },
  );

  const { data: reservesByDate, isLoading: isReserveLoading } = useGetReserveByDate(selectedDate, {
    refetchInterval: 60 * 2 * 1000,
  });

  useEffect(() => {
    if (allFloorSummary) {
      if (!defaultFloor) {
        setSelectedFloor(allFloorSummary.filter((floor) => !floor.disabled).at(0)?.id ?? null);
        return;
      }

      setSelectedFloor(Number(defaultFloor));
    }
  }, [allFloorSummary, defaultFloor]);

  return (
    <div className="relative flex h-full flex-col">
      <div>
        <div className="px-6 pb-3 pt-6 text-3xl font-bold">
          {formatDate(selectedDate, 'yyyy-MM-dd')}
        </div>
        <div className="mx-4">
          <DateSelector
            selected={selectedDate}
            showDateLength={13}
            onSelect={(date) => setSelectedDate(date)}
          />
        </div>

        {allFloorSummary && (
          <Tab
            items={allFloorSummary
              .filter((floor) => !floor.disabled)
              .map((floor) => ({
                value: floor.id.toString(),
                label: floor.name,
              }))}
            selected={selectedFloor?.toString() ?? null}
            onChange={(v) => v && setSelectedFloor(+v)}
          />
        )}
      </div>

      {floorDetail && !isFloorDetailLoading && !isReserveLoading ? (
        <TransformWrapper
          centerOnInit
          disablePadding
          maxScale={1}
          minScale={0.5}
          panning={{ velocityDisabled: true }}
        >
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <FacilityGridViewer
              className="m-4"
              facilities={floorDetail.facilities}
              reserves={reservesByDate ?? []}
            />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <Loading />
      )}

      <Refresh
        onClick={() => {
          queryClinet.invalidateQueries({ queryKey: [getFloorDetail.name] });
        }}
      />
    </div>
  );
}

export default Viewer;
