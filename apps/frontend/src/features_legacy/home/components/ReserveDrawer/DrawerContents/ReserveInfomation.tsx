import React from 'react';

import {
  useReserveDispatchContext,
  useReserveMaterialContext,
} from '@/features_legacy/home/hooks/useReserveContext';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { Button } from '@/shared/components/Button';
import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

import { ReserveDrawerHeader } from '../Header';

export function ReserveInfomation() {
  const { selectedFacility, selectedDate } = useReserveMaterialContext();
  const dispatch = useReserveDispatchContext();
  const { data: reservesByDate } = useGetReserveByDate(selectedDate);

  return (
    <>
      <ReserveDrawerHeader title={`${selectedFacility?.name || '...'} 예약 현황`} />
      {/* info 스텝일때 표시할 내용 */}

      <div className="my-4 space-y-2">
        {/* 현재 좌석에 대한 예약들 표시 */}
        {reservesByDate
          ?.filter((reserve) => reserve.facility.id === selectedFacility?.id)
          .map((reserve) => (
            <div
              key={reserve.id}
              className={cn(
                'flex justify-between rounded-[10px] border border-neutral-150 px-6 py-3.5 text-sm font-medium shadow-blur-sm',
                {
                  'opacity-50':
                    reserve.end && new Date(reserve.end) <= new Date() && !reserve.always,
                },
              )}
            >
              <span>{reserve.user.name}</span>
              <span>
                {reserve.always ? (
                  '고정석'
                ) : (
                  <span className="flex gap-1">
                    {getHHMM(new Date(reserve.start))}
                    <span>-</span>
                    {reserve.end && getHHMM(new Date(reserve.end))}
                  </span>
                )}
              </span>
            </div>
          ))}
      </div>

      <Button
        className="my-8"
        size="full"
        variant="secondary"
        onClick={() => dispatch({ type: 'READY_ADD_RESERVE' })}
      >
        예약 하기
      </Button>
    </>
  );
}
