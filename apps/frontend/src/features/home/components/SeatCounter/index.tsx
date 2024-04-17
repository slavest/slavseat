import React, { useMemo, useState } from 'react';
import { CgClose } from 'react-icons/cg';

import { Model } from '@slavseat/types';
import { FacilityType } from '@slavseat/types/src/model';

import { cn } from '@/shared/utils/class.util';

interface SeatCounterProps {
  floorInfo: Model.FloorInfo | undefined;
  reserveInfos: Model.ReserveInfo[] | undefined;
}

export function SeatCounter({
  floorInfo,
  reserveInfos,
}: SeatCounterProps) {
  const [expand, setExpand] = useState(true);

  const { allSeatCount, usingSeatCount, restSeatCount } =
    useMemo(() => {
      const allSeatCount = floorInfo
        ? floorInfo.facilities.filter(
            (facility) => facility.type === FacilityType.SEAT,
          ).length
        : 0;

      const usingSeatCount = reserveInfos?.length || 0;

      const restSeatCount =
        !floorInfo || !reserveInfos
          ? 0
          : allSeatCount - usingSeatCount;

      return { allSeatCount, usingSeatCount, restSeatCount };
    }, [floorInfo, reserveInfos]);

  return expand ? (
    <div
      className={cn(
        'w-[calc(100%_-_2rem)] h-[2.625rem]',
        'absolute bottom-4 right-4',
        'flex items-center justify-center',
        'rounded-3xl border',
        'bg-white shadow-xl',
        'text-xs font-semibold',
        'select-none',
      )}
    >
      {`총 좌석: ${allSeatCount}석 / 잔여 좌석: ${restSeatCount}석 / 사용중인 좌석: ${usingSeatCount}석`}

      <CgClose
        className="absolute right-4 cursor-pointer"
        onClick={() => setExpand(false)}
      />
    </div>
  ) : (
    <div
      className={cn(
        'h-[2.625rem] px-4',
        'absolute bottom-4 right-4',
        'flex items-center justify-center',
        'rounded-3xl border',
        'bg-white shadow-xl',
        'text-xs font-semibold',
        'select-none cursor-pointer',
      )}
      onClick={() => setExpand(true)}
    >
      현황 보기
    </div>
  );
}
