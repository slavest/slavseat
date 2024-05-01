import React from 'react';
import { BiSolidErrorCircle } from 'react-icons/bi';

import {
  useReserveDispatchContext,
  useReserveMaterialContext,
} from '@/features/home/hooks/useReserveContext';
import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { cn } from '@/shared/utils/class.util';

export function AlwayUserNotice() {
  const { exist } = useReserveMaterialContext();
  const dispatch = useReserveDispatchContext();

  if (!exist) return <Loading />;

  return (
    <div className={cn('flex flex-col gap-y-6')}>
      <div className="flex justify-center">
        <BiSolidErrorCircle className="opacity-65" size="50%" />
      </div>

      <div>
        <p className={cn('text-2xl font-bold text-red-500', 'mb-2')}>잠깐!</p>

        <h2 className={cn('text-lg font-semibold', 'mb-1')}>
          사용하고 있는 <span className={cn('relative', 'text-xl font-bold')}>고정석</span>이
          있으시네요!
        </h2>

        <p>관리자에게 문의하여 고정석을 취소해주세요.</p>
      </div>

      <Button variant="tertiary" onClick={() => dispatch({ type: 'CANCEL_OVERRIDE_RESERVE' })}>
        확인
      </Button>
    </div>
  );
}
