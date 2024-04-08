import { useMutation } from '@tanstack/react-query';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

import { Model } from '@slavseat/types';
import { format, parse } from 'date-fns';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { Button } from '@/shared/components/Button';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import ScrollArea from '@/shared/components/ScrollArea';
import { formatHHMM } from '@/shared/constants/date.constant';
import { cn } from '@/shared/utils/class.util';

import { Box } from '../components/Box';
import { useCancelReserveMutation } from '../hooks/cancel-reserve';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminReserveManage() {
  const { setTitle } = useAdminAppStore();
  useEffect(() => setTitle('예약 관리'), [setTitle]);

  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);
  const facilityElementRef = useRef<Record<number, HTMLDivElement>>(
    {},
  );
  const [date, setDate] = useState<Date>(new Date());
  const [viewFloor, setViewFloor] = useState<number>();
  const [selectedReserve, setSelectedReserve] =
    useState<Model.ReserveInfo>();

  const { mutate: cancleReserveMutation } =
    useCancelReserveMutation();

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail } = useGetFloorDetailQuery(viewFloor!, {
    enabled: viewFloor !== undefined,
  });
  const { data: reserveList } = useGetReserveByDate(date);

  const addFacilityRef = useCallback(
    (id: number, ref: HTMLDivElement | null) => {
      if (ref) facilityElementRef.current[id] = ref;
    },
    [],
  );

  const handleClickReserve = useCallback(
    (reserve: Model.ReserveInfo) => {
      if (reserve.id === selectedReserve?.id) {
        setSelectedReserve(undefined);
        return;
      }

      const element = facilityElementRef.current[reserve.facility.id];
      if (transformRef.current && element) {
        setSelectedReserve(reserve);
        transformRef.current.zoomToElement(element, 1, 150);
      }
    },
    [selectedReserve?.id],
  );

  const handleClickCancelReserve = useCallback(() => {
    if (!selectedReserve) return alert('선택된 예약이 없습니다.');
    cancleReserveMutation(selectedReserve.id);
    setSelectedReserve(undefined);
  }, [cancleReserveMutation, selectedReserve]);

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <Box title="날짜 선택">
          <input
            type="date"
            value={format(date, 'yyyy-MM-dd')}
            onChange={(e) =>
              setDate(parse(e.target.value, 'yyyy-MM-dd', new Date()))
            }
            className="text-sm border border-neutral-400 rounded-md p-1"
          />
        </Box>
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
        <Box title="Reserve 관리 툴바">
          <Button onClick={handleClickCancelReserve}>
            선택 예약 취소
          </Button>
        </Box>
      </div>

      <div className="flex gap-4">
        {viewFloor && (
          <Box title="예약 목록" innerPadding={false}>
            <ScrollArea className="h-[50rem]">
              <div className="p-2 space-y-2 text-sm overflow-visible">
                {reserveList
                  ?.filter(
                    (reserve) =>
                      reserve.facility.floor.id === viewFloor,
                  )
                  .map((reserve) => (
                    <div
                      key={reserve.id}
                      onClick={() => handleClickReserve(reserve)}
                      className={cn(
                        'flex gap-4 p-2 shadow-blur-sm border border-neutral-200 rounded-lg cursor-pointer text-nowrap',
                        {
                          'border-black':
                            selectedReserve?.id === reserve.id,
                        },
                      )}
                    >
                      <span>
                        {reserve.facility.floor.name}-
                        {reserve.facility.name}
                      </span>
                      <span>{reserve.user.name}</span>
                      <span>
                        {format(reserve.start, formatHHMM)}-
                        {reserve.always
                          ? '(고정석)'
                          : format(reserve.end, formatHHMM)}
                      </span>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </Box>
        )}

        {floorDetail && (
          <Box
            title="Facility Grid 뷰"
            className="flex-1"
            innerPadding={false}
            fullWidth
          >
            <TransformWrapper
              minScale={0.5}
              maxScale={1}
              disablePadding
              centerOnInit
              ref={transformRef}
            >
              <TransformComponent
                wrapperStyle={{ width: '100%', height: '100%' }}
              >
                <FacilityGridViewer
                  selected={
                    selectedReserve && [selectedReserve?.facility.id]
                  }
                  onItemRender={(facility, ref) =>
                    addFacilityRef(facility.id, ref)
                  }
                  facilities={floorDetail?.facilities}
                  reserves={[]}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>
        )}
      </div>
    </div>
  );
}
