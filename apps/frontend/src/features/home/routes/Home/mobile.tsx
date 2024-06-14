import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { FacilityType } from '@slavseat/types/src/model';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { DateSelector } from '@/shared/components/DateSelector';
import { Drawer } from '@/shared/components/Drawer';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import { Loading } from '@/shared/components/Loading';
import { Tab } from '@/shared/components/Tab';

import { AddReserveForm } from '../../components/ReserveDrawer/DrawerContents/AddReserveForm';
import { AlwayUserNotice } from '../../components/ReserveDrawer/DrawerContents/AlwayUserNotice';
import { ExistReserveNotice } from '../../components/ReserveDrawer/DrawerContents/ExistReserveNotice';
import { OverrideReserveConfirm } from '../../components/ReserveDrawer/DrawerContents/OverrideReserveConfirm';
import { ReserveInfomation } from '../../components/ReserveDrawer/DrawerContents/ReserveInfomation';
import { SeatCounter } from '../../components/SeatCounter';
import { useReserveReducer } from '../../hooks/useReserveReducer';
import { DrawerProvider } from '../../providers/DrawerProvider';

function Home() {
  const [reserveMaterial, reserveDispatch] = useReserveReducer();
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail, isLoading: isFloorDetailLoading } = useGetFloorDetailQuery(
    selectedFloor!,
    {
      enabled: selectedFloor !== null,
    },
  );

  const { data: reservesByDate, isLoading: isReserveLoading } = useGetReserveByDate(
    reserveMaterial.selectedDate,
  );

  useEffect(() => {
    if (allFloorSummary) {
      setSelectedFloor(allFloorSummary.filter((floor) => !floor.disabled).at(0)?.id ?? null);
    }
  }, [allFloorSummary]);

  useEffect(() => {
    const week = Date.now() + 1000 * 60 * 60 * 24 * 7;
    if (reserveMaterial.selectedDate.getTime() > week) {
      toast.info('1주일 뒤 날짜는 미리 예약되지 않습니다!', { autoClose: 700 });
    }
  }, [reserveMaterial.selectedDate]);

  return (
    <div className="relative flex h-full flex-col">
      <div>
        <div className="px-6 pb-3 pt-6 text-xl font-bold">좌석 배치도</div>
        <div className="mx-4">
          <div className="px-2 pb-2 text-xs text-gray-400">
            {reserveMaterial.selectedDate.getMonth() + 1}월
          </div>
          <DateSelector
            selected={reserveMaterial.selectedDate}
            onSelect={(date) => reserveDispatch({ type: 'SELECT_DATE', date })}
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
              onClickFacility={(d) =>
                d.type === FacilityType.SEAT &&
                reserveDispatch({ type: 'SELECT_FACILITY', facility: d })
              }
            />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <Loading />
      )}

      <SeatCounter floorInfo={floorDetail} reserveInfos={reservesByDate} />

      <DrawerProvider dispatch={reserveDispatch} material={reserveMaterial}>
        <Drawer.Root
          open={
            !reserveMaterial.exist?.existsReserve &&
            !!reserveMaterial.selectedFacility &&
            !!reservesByDate
          }
          onOpen={(open) => open === false && reserveDispatch({ type: 'CANCEL_ADD_RESERVE' })}
        >
          <Drawer.Popover>
            <Drawer.Backdrop />
            <Drawer.Body>
              <Drawer.DragBar />
              {
                {
                  info: <ReserveInfomation />,
                  addReserve: <AddReserveForm />,
                }[reserveMaterial.drawerStep]
              }
            </Drawer.Body>
          </Drawer.Popover>
        </Drawer.Root>

        <Drawer.Root
          open={!!reserveMaterial.exist?.existsReserve}
          onOpen={(open) => open === false && reserveDispatch({ type: 'CANCEL_OVERRIDE_RESERVE' })}
        >
          <Drawer.Popover>
            <Drawer.Backdrop />
            <Drawer.Body>
              <Drawer.DragBar />
              {
                {
                  overrideNotice: <ExistReserveNotice />,
                  overrideReserve: <OverrideReserveConfirm />,
                  alwayUserNotice: <AlwayUserNotice />,
                }[reserveMaterial.floatingDrawerStep]
              }
            </Drawer.Body>
          </Drawer.Popover>
        </Drawer.Root>
      </DrawerProvider>
    </div>
  );
}

export default Home;
