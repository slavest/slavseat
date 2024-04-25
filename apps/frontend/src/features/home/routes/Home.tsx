import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { Model } from '@slavseat/types';
import { FacilityType } from '@slavseat/types/src/model';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useAddReserveMutation } from '@/shared/api/query/reserve/add-reserve';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { DateSelector } from '@/shared/components/DateSelector';
import { FloatingDrawer } from '@/shared/components/Drawer';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import { Loading } from '@/shared/components/Loading';
import { Tab } from '@/shared/components/Tab';

import { ReserveData, ReserveDrawer } from '../components/ReserveDrawer';
import { ExistReserveNotice } from '../components/ReserveDrawer/DrawerContents/ExistReserveNotice';
import { OverrideReserveConfirm } from '../components/ReserveDrawer/DrawerContents/OverrideReserveConfirm';
import { SeatCounter } from '../components/SeatCounter';

function Home() {
  const [drawerStep, setDrawerStep] = useState<'overrideNotice' | 'override'>('overrideNotice');

  const [existReserve, setExistReserve] = useState<Model.ReserveInfo | null>(null);
  const [newReserveData, setNewReserveData] = useState<ReserveData | null>(null);

  const [selectedFacility, setSelectedFacility] = useState<Model.FacilitySummary>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail, isLoading: isFloorDetailLoading } = useGetFloorDetailQuery(
    selectedFloor!,
    {
      enabled: selectedFloor !== null,
    },
  );
  const { data: reservesByDate, isLoading: isReserveLoading } = useGetReserveByDate(selectedDate);

  const { mutate: addReserveMutation, loading: mutateLoading } = useAddReserveMutation({
    onSuccess: () => setSelectedFacility(undefined),
    onError: (error) => {
      if (error.response?.status === 409) {
        const existsReserve = error.response.data as unknown as Model.ReserveInfo;

        setExistReserve(existsReserve);
        return;
      }

      toast.error(error.response?.data.message.replace('.', '.\n') || '에러가 발생 했습니다.');
    },
  });

  const handleSubmitReserve = useCallback(
    (data: ReserveData) => {
      data.start.setMonth(selectedDate.getMonth());
      data.start.setDate(selectedDate.getDate());

      data.end?.setMonth(selectedDate.getMonth());
      data.end?.setDate(selectedDate.getDate());

      setNewReserveData(data);
      addReserveMutation(data);
    },
    [addReserveMutation, selectedDate],
  );

  const resetOverrideReserve = useCallback(() => {
    setExistReserve(null);
    setNewReserveData(null);
    setDrawerStep('overrideNotice');
  }, []);

  useEffect(() => {
    if (allFloorSummary) {
      setSelectedFloor(allFloorSummary.at(0)?.id ?? null);
    }
  }, [allFloorSummary]);

  return (
    <div className="relative flex h-full flex-col">
      <div>
        <div className="px-6 pb-3 pt-6 text-xl font-bold">좌석 배치도</div>
        <div className="mx-4">
          <div className="px-2 pb-2 text-xs text-gray-400">{selectedDate.getMonth() + 1}월</div>
          <DateSelector selected={selectedDate} onSelect={setSelectedDate} />
        </div>
        {allFloorSummary && (
          <Tab
            items={allFloorSummary.map((floor) => ({
              value: floor.id.toString(),
              label: floor.name,
            }))}
            selected={selectedFloor?.toString() ?? null}
            onChange={(v) => v && setSelectedFloor(+v)}
          />
        )}
      </div>
      {floorDetail && !isFloorDetailLoading && !isReserveLoading ? (
        <TransformWrapper centerOnInit disablePadding maxScale={1} minScale={0.5}>
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <FacilityGridViewer
              className="m-4"
              facilities={floorDetail.facilities}
              reserves={reservesByDate ?? []}
              onClickFacility={(d) => d.type === FacilityType.SEAT && setSelectedFacility(d)}
            />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <Loading />
      )}

      <SeatCounter floorInfo={floorDetail} reserveInfos={reservesByDate} />

      <ReserveDrawer
        facility={selectedFacility}
        loading={mutateLoading}
        open={!existReserve && !!selectedFacility && !!reservesByDate}
        reserves={reservesByDate?.filter((reserve) => reserve.facility.id === selectedFacility?.id)}
        onClose={() => setSelectedFacility(undefined)}
        onSubmit={handleSubmitReserve}
      />

      <FloatingDrawer open={!!existReserve} onClose={resetOverrideReserve}>
        {!existReserve || !newReserveData ? (
          <Loading />
        ) : (
          {
            overrideNotice: (
              <ExistReserveNotice
                existReserve={existReserve}
                onClickCancel={() => setExistReserve(null)}
                onClickOk={() => setDrawerStep('override')}
              />
            ),
            override: (
              <OverrideReserveConfirm
                existReserve={existReserve}
                reserveData={newReserveData}
                onFail={resetOverrideReserve}
                onFinish={resetOverrideReserve}
              />
            ),
          }[drawerStep]
        )}
      </FloatingDrawer>
    </div>
  );
}

export default Home;
