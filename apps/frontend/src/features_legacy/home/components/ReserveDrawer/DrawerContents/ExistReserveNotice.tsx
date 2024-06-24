import React from 'react';

import {
  useReserveDispatchContext,
  useReserveMaterialContext,
} from '@/features_legacy/home/hooks/useReserveContext';
import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { cn } from '@/shared/utils/class.util';

export function ExistReserveNotice() {
  const { exist } = useReserveMaterialContext();
  const dispatch = useReserveDispatchContext();

  if (!exist) {
    return <Loading />;
  }

  return (
    <div className={cn('mb-8 flex flex-col gap-2')}>
      <p>
        예약하려고 한 시간대에{' '}
        <span className={cn('text-lg font-semibold')}>이미 예약중인 좌석이 있어요.</span>
      </p>

      <p className={cn('text-lg text-red-500')}>
        <span className={cn('font-bold')}>{exist.existsReserve.facility.name}</span> 예약을 취소하고
        새로 예약을 진행할까요?
      </p>

      <p className="mb-2 text-xs text-neutral-400">
        *기존 예약한 좌석은 자동으로 취소되고 방금 선택한 좌석이 새롭게 예약됩니다.
      </p>

      <div className="flex items-center gap-x-2">
        <Button
          className="w-1/2"
          variant="secondary"
          onClick={() => dispatch({ type: 'CANCEL_OVERRIDE_RESERVE' })}
        >
          취소
        </Button>
        <Button
          className="w-1/2"
          onClick={() =>
            dispatch({
              type: 'READY_OVERRIDE_RESERVE',
              reserveFormData: exist.reserveFormData,
              existsReserve: exist.existsReserve,
            })
          }
        >
          확인
        </Button>
      </div>
    </div>
  );
}
