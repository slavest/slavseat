import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
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
  const facilityElementRef = useRef<Record<number, HTMLDivElement>>({});
  const [date, setDate] = useState<Date>(new Date());
  const [viewFloor, setViewFloor] = useState<number>();
  const [selectedReserve, setSelectedReserve] = useState<Model.ReserveInfo>();

  const { mutate: cancleReserveMutation } = useCancelReserveMutation({
    onSuccess: () => toast.success('예약이 취소되었습니다.'),
    onError: (e) => toast.error(e.response?.data.message),
  });

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail } = useGetFloorDetailQuery(viewFloor!, {
    enabled: viewFloor !== undefined,
  });
  const { data: reserveList } = useGetReserveByDate(date);

  const addFacilityRef = useCallback((id: number, ref: HTMLDivElement | null) => {
    if (ref) facilityElementRef.current[id] = ref;
  }, []);

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
            className="rounded-md border border-neutral-400 p-1 text-sm"
            type="date"
            value={format(date, 'yyyy-MM-dd')}
            onChange={(e) => setDate(parse(e.target.value, 'yyyy-MM-dd', new Date()))}
          />
        </Box>
        <Box title="Floor 선택">
          <select
            className="rounded border border-neutral-200 text-sm"
            value={viewFloor}
            onChange={(e) => e.target.value && setViewFloor(Number(e.target.value))}
          >
            <option key="" value="">
              층을 선택해 주세요
            </option>
            {allFloorSummary?.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.name}
              </option>
            ))}
          </select>
        </Box>
        <Box title="Reserve 관리 툴바">
          <Button onClick={handleClickCancelReserve}>선택 예약 취소</Button>
        </Box>
      </div>

      <div className="flex gap-4">
        {viewFloor && (
          <Box innerPadding={false} title="예약 목록">
            <ScrollArea className="h-[50rem]">
              <div className="space-y-2 overflow-visible p-2 text-sm">
                {reserveList
                  ?.filter((reserve) => reserve.facility.floor.id === viewFloor)
                  .map((reserve) => (
                    <div
                      key={reserve.id}
                      className={cn(
                        'flex cursor-pointer gap-4 text-nowrap rounded-lg border border-neutral-200 p-2 shadow-blur-sm',
                        {
                          'border-black': selectedReserve?.id === reserve.id,
                        },
                      )}
                      onClick={() => handleClickReserve(reserve)}
                    >
                      <span>
                        {reserve.facility.floor.name}-{reserve.facility.name}
                      </span>
                      <span>{reserve.user.name}</span>
                      <span>
                        {format(reserve.start, formatHHMM)}-
                        {reserve.always ? '(고정석)' : format(reserve.end, formatHHMM)}
                      </span>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </Box>
        )}

        {floorDetail && (
          <Box fullWidth className="w-1 flex-1" innerPadding={false} title="Facility Grid 뷰">
            <TransformWrapper
              ref={transformRef}
              centerOnInit
              disablePadding
              maxScale={1}
              minScale={0.5}
              panning={{ velocityDisabled: true }}
            >
              <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                <FacilityGridViewer
                  facilities={floorDetail?.facilities}
                  reserves={[]}
                  selected={selectedReserve && [selectedReserve?.facility.id]}
                  onItemRender={(facility, ref) => addFacilityRef(facility.id, ref)}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>
        )}
      </div>
    </div>
  );
}
