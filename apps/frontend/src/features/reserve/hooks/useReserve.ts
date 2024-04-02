import { useMemo } from 'react';

import { Model } from '@slavseat/types';

import { checkUsing, groupDataByDate } from '../utils/reserve.util';

/**
 * 고정 좌석
 * 사용중 좌석
 * 그냥 좌석 날짜별
 * @param reserves
 * @returns
 */
export function useReserve(
  reserves: Model.ReserveInfo[] | undefined,
) {
  // 고정 좌석 예약 정보
  const alwayReserve = useMemo(() => {
    return reserves?.find((reserve) => reserve.always);
  }, [reserves]);

  // 날짜별 예약 정보
  const groupReserves = reserves
    ? groupDataByDate(reserves.filter((reserve) => !reserve.always))
    : null;

  const usingReserves = reserves
    ? reserves.filter((reserve) => checkUsing(reserve))
    : [];

  return { alwayReserve, groupReserves, usingReserves };
}
