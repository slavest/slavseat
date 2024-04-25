import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { GoDash } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';

import { useCancelReserve } from '@/features/home/hooks/useCancelReserve';
import { useAddReserveMutation } from '@/shared/api/query/reserve/add-reserve';
import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { cn } from '@/shared/utils/class.util';

import { ReserveData } from '..';

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

interface OverrideReserveComfirmProps {
  existReserve: Model.ReserveInfo;
  reserveData: ReserveData;
  onFinish: () => void;
  onFail: () => void;
}

export function OverrideReserveConfirm({
  existReserve,
  reserveData,
  onFinish,
  onFail,
}: OverrideReserveComfirmProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  const setLazy = useCallback((ms: number) => {
    const mockLoading = new Promise((resolve) => {
      setTimeout(() => resolve(true), ms);
    });

    setIsLoading(true);
    mockLoading.then(() => setIsLoading(false));
  }, []);

  const {
    mutate: addReserve,
    loading: addLoading,
    isError: addError,
  } = useAddReserveMutation({
    onSuccess: () => {
      setFinish(true);
    },
    onError: (error) => {
      toast.error(
        error.response?.status === 409
          ? '이미 예약중인 좌석이 존재합니다!'
          : '예약을 실패했습니다.',
      );

      onFail();
    },
  });

  const {
    loading: cancelLoading,
    isError: cancelError,
    mutate: cancelReserve,
  } = useCancelReserve({
    onSuccess: () => {
      addReserve(reserveData);
    },
    onError: () => {
      toast.error('예약 취소를 실패했습니다.');

      onFail();
    },
  });

  const overrideReserve = useCallback(async () => {
    setLazy(1500);
    cancelReserve(existReserve.id);
  }, [cancelReserve, existReserve.id, setLazy]);

  useEffect(() => {
    if (finish && !isLoading) {
      toast.success('예약을 완료했습니다!');
      onFinish();
    }
  }, [finish, isLoading, onFinish]);

  return (
    <div className={cn('flex flex-col gap-2')}>
      <div
        className={cn(
          'mb-4 w-full',
          'grid grid-cols-[60%_40%] items-center justify-start gap-x-3 gap-y-2',
          'font-semibold',
        )}
      >
        <p>기존 예약 취소 하기</p>
        <Checker error={cancelError} loading={cancelLoading} start={isLoading} />

        <p>새로운 예약 등록 하기</p>
        <Checker error={addError} loading={cancelLoading || addLoading} start={isLoading} />
      </div>

      <Button disabled={cancelError || addError} onClick={overrideReserve}>
        {isLoading || cancelLoading || addLoading ? <Loading /> : '새로 예약하기'}
      </Button>
    </div>
  );
}
