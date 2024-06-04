import React, { PropsWithChildren } from 'react';

import { Model } from '@slavseat/types';

import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { Badge, Status } from '@/shared/components/Badge';

import { useReserveMaterialContext } from '../../hooks/useReserveContext';

type ReserveDrawerHeaderProps = PropsWithChildren<{
  title: string;
}>;

const isCurrentReserve = (reserve: Model.ReserveInfo) =>
  new Date(reserve.start).getTime() <= Date.now() &&
  (reserve.always ||
    reserve.end === undefined ||
    (reserve.end && new Date(reserve.end).getTime() >= Date.now()));

export function ReserveDrawerHeader({ title, children }: ReserveDrawerHeaderProps) {
  const { selectedFacility, selectedDate } = useReserveMaterialContext();
  const { data: reservesByDate } = useGetReserveByDate(selectedDate);

  const reserves = reservesByDate?.filter(
    (reserve) => reserve.facility.id === selectedFacility?.id,
  );

  const currentReserve = reserves?.filter(isCurrentReserve).at(0);
  const isFutureReserved = Boolean(
    reserves?.filter((reserve) => new Date(reserve.start).getTime() >= Date.now()).length,
  );

  return (
    <div>
      <Badge
        status={
          currentReserve
            ? currentReserve.always
              ? Status.ALWAYS
              : Status.USING
            : isFutureReserved
              ? Status.RESERVED
              : Status.ABLE_RESERVE
        }
      />

      <div className="flex items-center justify-between text-2xl font-medium">
        <span>{title}</span>

        {children}
      </div>
      <div className="text-sm font-medium text-neutral-400">
        {currentReserve
          ? `${currentReserve.user.name} 님이 현재 사용중입니다.`
          : '사용중이지 않은 좌석입니다.'}
      </div>
    </div>
  );
}
