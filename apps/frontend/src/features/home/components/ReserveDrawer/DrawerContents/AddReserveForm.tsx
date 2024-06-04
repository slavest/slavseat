import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';
import { format, parse } from 'date-fns';

import {
  useReserveDispatchContext,
  useReserveMaterialContext,
} from '@/features/home/hooks/useReserveContext';
import { useAddReserveMutation } from '@/shared/api/query/reserve/add-reserve';
import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { TimePicker } from '@/shared/components/TimePicker';
import { Toggle } from '@/shared/components/Toggle';
import { formatHHMM } from '@/shared/constants/date.constant';
import { useUserStore } from '@/shared/stores/userStore';

import { ReserveDrawerHeader } from '../Header';

export interface ReserveSchema {
  reserveType: 'always' | 'period' | 'day';
  start: Date;
  end: Date;
  facility?: Model.FacilitySummary;
}

export function AddReserveForm() {
  const { user } = useUserStore();
  const { selectedFacility, selectedDate } = useReserveMaterialContext();
  const dispatch = useReserveDispatchContext();
  const { watch, setValue, getValues } = useForm<ReserveSchema>({
    values: {
      reserveType: 'day',
      start: parse('08:00', formatHHMM, new Date()),
      end: parse('17:00', formatHHMM, new Date()),
      facility: selectedFacility,
    },
  });

  const watchedStart = watch('start');
  const watchedEnd = watch('end');
  const reserveType = watch('reserveType');

  const setRange = useCallback(
    (start: string, end: string) => {
      setValue('start', parse(start, formatHHMM, new Date()));
      setValue('end', parse(end, formatHHMM, new Date()));
    },
    [setValue],
  );

  const { mutate: addReserveMutation, loading } = useAddReserveMutation({
    onSuccess: () => dispatch({ type: 'SUCCESS_ADD_RESERVE' }),
    onError: (error, value) => {
      if (error.response?.status === 409) {
        const existsReserve = error.response.data as unknown as Model.ReserveInfo;
        if (!existsReserve.user || !user || existsReserve.user.id !== user.id) {
          toast.error('해당 좌석은 예약되어 있습니다.');
          return;
        }

        dispatch({
          type: 'CONFLICT_RESERVE',
          existsReserve,
          reserveFormData: value,
        });
        return;
      }

      toast.error(error.response?.data.message.replace('.', '.\n') || '에러가 발생 했습니다.');
    },
  });

  const handleSubmitForm = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      const start = getValues('start');
      const end = getValues('end');
      const reserveType = getValues('reserveType');

      if (!selectedFacility || !start) return toast.error('예약 시간이 잘못되었습니다');
      const always = reserveType === 'always';
      if (!always && end && start.getTime() >= end.getTime())
        return toast.error('예약 시간이 잘못되었습니다');

      start.setMonth(selectedDate.getMonth(), selectedDate.getDate());

      end.setMonth(selectedDate.getMonth(), selectedDate.getDate());

      return addReserveMutation({
        start,
        end,
        always,
        facilityId: selectedFacility.id,
      });
    },
    [getValues, selectedFacility, selectedDate, addReserveMutation],
  );

  return (
    <>
      <ReserveDrawerHeader title={`${selectedFacility?.name || '...'} 예약`}>
        <Toggle.Root
          className="m-auto mr-0"
          value={reserveType}
          onChange={(v) => setValue('reserveType', v as typeof reserveType)}
        >
          <Toggle.Item value="day">종일</Toggle.Item>
          <Toggle.Item value="period">시간차</Toggle.Item>
          {/* <Toggle.Item value="always">고정석</Toggle.Item> */}
        </Toggle.Root>
      </ReserveDrawerHeader>

      <form className="mb-8" data-vaul-no-drag={true} onSubmit={handleSubmitForm}>
        <div className="my-10 flex items-center justify-center gap-4" data-vaul-no-drag={true}>
          {reserveType === 'day' ? (
            <>
              <Toggle.Root className="h-[4rem] rounded-xl p-1.5" defaultValue="85">
                <Toggle.Item
                  className="grid w-[5rem] place-content-center rounded-lg text-lg font-semibold"
                  value="85"
                  onClick={() => setRange('08:00', '17:00')}
                >
                  8 To 5
                </Toggle.Item>
                <Toggle.Item
                  className="grid w-[5rem] place-content-center rounded-lg text-lg font-semibold"
                  value="96"
                  onClick={() => setRange('09:00', '18:00')}
                >
                  9 To 6
                </Toggle.Item>
                <Toggle.Item
                  className="grid w-[5rem] place-content-center rounded-lg text-lg font-semibold"
                  value="107"
                  onClick={() => setRange('10:00', '19:00')}
                >
                  10 To 7
                </Toggle.Item>
              </Toggle.Root>
            </>
          ) : (
            <>
              <TimePicker
                className="text-lg"
                value={format(watchedStart, formatHHMM)}
                onChangeTime={(v) => {
                  setValue('start', parse(v, formatHHMM, new Date()));
                }}
              />
              <span className="text-sm">부터</span>
              <TimePicker
                className="text-lg"
                disabled={reserveType === 'always'}
                value={format(watchedEnd, formatHHMM)}
                onChangeTime={(v) => setValue('end', parse(v, formatHHMM, new Date()))}
              />
            </>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            className="flex w-12 items-center justify-center"
            type="button"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: 'CANCEL_ADD_RESERVE' });
            }}
          >
            {/* 예약 현황 */}
            <IoMdArrowRoundBack />
          </Button>
          <Button className="flex-1 text-sm" disabled={loading} type="submit" variant="primary">
            {loading ? <Loading /> : '좌석 예약'}
          </Button>
        </div>
      </form>
    </>
  );
}
