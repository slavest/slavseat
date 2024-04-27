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
import { Drawer, FloatingDrawer } from '@/shared/components/Drawer';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import { Loading } from '@/shared/components/Loading';
import { Tab } from '@/shared/components/Tab';
import { useUserStore } from '@/shared/stores/userStore';

import {
  AddReserveForm,
  ReserveData,
} from '../components/ReserveDrawer/DrawerContents/AddReserveForm';
import { ExistReserveNotice } from '../components/ReserveDrawer/DrawerContents/ExistReserveNotice';
import { OverrideReserveConfirm } from '../components/ReserveDrawer/DrawerContents/OverrideReserveConfirm';
import { ReserveInfomation } from '../components/ReserveDrawer/DrawerContents/ReserveInfomation';
import { SeatCounter } from '../components/SeatCounter';

function Home() {
  const { user } = useUserStore();
  const [reserveStep, setReserveStep] = useState<'info' | 'reserve'>('info');
  const [overrideStep, setOverrideStep] = useState<'overrideNotice' | 'override'>('overrideNotice');

  const [existReserve, setExistReserve] = useState<Model.ReserveInfo | null>(null);
  const [newReserveData, setNewReserveData] = useState<ReserveData | null>(null);

  const [selectedFacility, setSelectedFacility] = useState<Model.FacilitySummary>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();

  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
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
        const _existsReserve = error.response.data as unknown as Model.ReserveInfo;
        if (!_existsReserve.user || !user || _existsReserve.user.id !== user.id) {
          toast.error('해당 좌석은 예약되어 있습니다.');
          return;
        }

        setExistReserve(_existsReserve);
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
    setOverrideStep('overrideNotice');
  }, []);

  useEffect(() => {
    if (allFloorSummary) {
      setSelectedFloor(allFloorSummary.at(0)?.id ?? null);
    }
  }, [allFloorSummary]);

  useEffect(() => {
    const week = Date.now() + 1000 * 60 * 60 * 24 * 7;
    if (selectedDate.getTime() > week) {
      toast.info('1주일 뒤 날짜는 미리 예약되지 않습니다!', { autoClose: 700 });
    }
  }, [selectedDate]);

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
              onClickFacility={(d) => d.type === FacilityType.SEAT && setSelectedFacility(d)}
            />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <Loading />
      )}

      <SeatCounter floorInfo={floorDetail} reserveInfos={reservesByDate} />

      <Drawer
        open={!existReserve && !!selectedFacility && !!reservesByDate}
        onClose={() => {
          setReserveStep('info');
          setSelectedFacility(undefined);
        }}
      >
        {
          {
            info: (
              <ReserveInfomation
                facility={selectedFacility}
                reserves={reservesByDate?.filter(
                  (reserve) => reserve.facility.id === selectedFacility?.id,
                )}
                onClickOk={() => setReserveStep('reserve')}
              />
            ),
            reserve: (
              <AddReserveForm
                facility={selectedFacility}
                loading={mutateLoading}
                reserves={reservesByDate?.filter(
                  (reserve) => reserve.facility.id === selectedFacility?.id,
                )}
                onClickPrev={() => setReserveStep('info')}
                onSubmit={handleSubmitReserve}
              />
            ),
          }[reserveStep]
        }
      </Drawer>

      <FloatingDrawer open={!!existReserve} onClose={resetOverrideReserve}>
        {!existReserve || !newReserveData ? (
          <Loading />
        ) : (
          {
            overrideNotice: (
              <ExistReserveNotice
                existReserve={existReserve}
                onClickCancel={() => setExistReserve(null)}
                onClickOk={() => setOverrideStep('override')}
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
          }[overrideStep]
        )}
      </FloatingDrawer>
    </div>
  );
}

export default Home;
