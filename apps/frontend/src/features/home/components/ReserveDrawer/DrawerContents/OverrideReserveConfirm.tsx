import React, { useCallback, useRef } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { GoDash } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

import { useCancelReserve } from '@/features/home/hooks/useCancelReserve';
import {
  useReserveDispatchContext,
  useReserveMaterialContext,
} from '@/features/home/hooks/useReserveContext';
import { useAddReserveMutation } from '@/shared/api/query/reserve/add-reserve';
import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { cn } from '@/shared/utils/class.util';

interface CheckerProps {
  loading: boolean;
  start: boolean;
  error: boolean;
}

function Checker({ loading, start, error }: CheckerProps) {
  const cacheStart = useRef(false);
  cacheStart.current = cacheStart.current || start;
  if (error) return <IoMdClose className="text-red-600" />;

  if (!cacheStart.current) {
    return <GoDash />;
  }

  return loading ? <Loading /> : <FaCheck className="text-primary" />;
}

export function OverrideReserveConfirm() {
  const { exist } = useReserveMaterialContext();
  const dispatch = useReserveDispatchContext();

  const {
    mutate: addReserve,
    loading: addLoading,
    isError: addError,
  } = useAddReserveMutation({
    onSuccess: () => {
      toast.success('예약을 완료했습니다!');
      dispatch({ type: 'SUCCESS_OVERRIDE_RESERVE' });
    },
    onError: (error) => {
      toast.error(
        error.response?.status === 409
          ? '좌석 상태를 다시 한번 확인해주세요.'
          : '예약을 실패했습니다.',
      );

      dispatch({ type: 'FAIL_OVERRIDE_RESERVE' });
    },
  });

  const {
    loading: cancelLoading,
    isError: cancelError,
    mutate: cancelReserve,
  } = useCancelReserve({
    onSuccess: () => {
      if (!exist) return;

      addReserve(exist.reserveFormData);
    },
    onError: () => {
      toast.error('예약 취소를 실패했습니다.');

      dispatch({ type: 'FAIL_OVERRIDE_RESERVE' });
    },
  });

  const overrideReserve = useCallback(async () => {
    if (!exist) return;

    cancelReserve(exist.existsReserve.id);
  }, [cancelReserve, exist]);

  return (
    <div className={cn('mb-8 flex flex-col gap-2')}>
      <div
        className={cn(
          'mb-4 w-full',
          'grid grid-cols-[60%_40%] items-center justify-start gap-x-3 gap-y-2',
          'font-semibold',
        )}
      >
        <p>기존 예약 취소 하기</p>
        <Checker error={cancelError} loading={cancelLoading} start={cancelLoading} />

        <p>새로운 예약 등록 하기</p>
        <Checker error={addError} loading={cancelLoading || addLoading} start={cancelLoading} />
      </div>

      <Button disabled={cancelError || addError} onClick={overrideReserve}>
        {cancelLoading || addLoading ? <Loading /> : '새로 예약하기'}
      </Button>
    </div>
  );
}
