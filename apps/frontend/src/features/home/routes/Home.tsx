import React, { useCallback, useEffect, useState } from 'react';
import {
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

import { Model } from '@slavseat/types';
import { FacilityType } from '@slavseat/types/src/model';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useAddReserveMutation } from '@/shared/api/query/reserve/add-reserve';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { DateSelector } from '@/shared/components/DateSelector';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import { Loading } from '@/shared/components/Loading';
import { Tab } from '@/shared/components/Tab';

import {
  ReserveData,
  ReserveDrawer,
} from '../components/ReserveDrawer';

function Home() {
  const [selectedFacility, setSelectedFacility] =
    useState<Model.FacilitySummary>();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFloor, setSelectedFloor] = useState<number | null>(
    null,
  );

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail, isLoading: isFloorDetailLoading } =
    useGetFloorDetailQuery(selectedFloor!, {
      enabled: selectedFloor !== null,
    });
  const { data: reservesByDate, isLoading: isReserveLoading } =
    useGetReserveByDate(selectedDate);

  const { mutate: addReserveMutation } = useAddReserveMutation({
    onSuccess: () => setSelectedFacility(undefined),
  });

  const handleSubmitReserve = useCallback(
    (data: ReserveData) => {
      data.start.setMonth(selectedDate.getMonth());
      data.start.setDate(selectedDate.getDate());

      data.end?.setMonth(selectedDate.getMonth());
      data.end?.setDate(selectedDate.getDate());

      addReserveMutation(data);
    },
    [addReserveMutation, selectedDate],
  );

  useEffect(() => {
    if (allFloorSummary) {
      setSelectedFloor(allFloorSummary.at(0)?.id ?? null);
    }
  }, [allFloorSummary]);

  return (
    <div className="h-full flex flex-col">
      <div>
        <div className="px-6 py-6 text-xl font-bold">좌석 배치도</div>
        <DateSelector
          className="mx-4"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        {allFloorSummary && (
          <Tab
            selected={selectedFloor?.toString() ?? null}
            items={allFloorSummary.map((floor) => ({
              value: floor.id.toString(),
              label: floor.name,
            }))}
            onChange={(v) => v && setSelectedFloor(+v)}
          />
        )}
      </div>
      {floorDetail && !isFloorDetailLoading && !isReserveLoading ? (
        <TransformWrapper
          minScale={0.5}
          maxScale={1}
          disablePadding
          centerOnInit
        >
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
          >
            <FacilityGridViewer
              className="m-4"
              facilities={floorDetail.facilities}
              reserves={reservesByDate ?? []}
              onClickFacility={(d) =>
                d.type === FacilityType.SEAT && setSelectedFacility(d)
              }
            />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <Loading />
      )}
      <ReserveDrawer
        open={!!selectedFacility && !!reservesByDate}
        onClose={() => setSelectedFacility(undefined)}
        facility={selectedFacility}
        reserves={reservesByDate?.filter(
          (reserve) => reserve.facility.id === selectedFacility?.id,
        )}
        onSubmit={handleSubmitReserve}
      />
    </div>
  );
}

export default Home;
