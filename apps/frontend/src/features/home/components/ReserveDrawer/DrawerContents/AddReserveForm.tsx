import React, { useCallback, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';
import { format, parse } from 'date-fns';

import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { TimePicker } from '@/shared/components/TimePicker';
import { Toggle } from '@/shared/components/Toggle';
import { formatHHMM } from '@/shared/constants/date.constant';

import { ReserveDrawerHeader } from '../Header';

export interface ReserveData {
  start: Date;
  end?: Date;
  always: boolean;
  facilityId: number;
}

interface AddReserveFormProps {
  facility?: Model.FacilitySummary;
  reserves?: Model.ReserveInfo[];
  loading?: boolean;
  onClickPrev?: () => void;
  onSubmit?: (data: ReserveData) => void;
}

export function AddReserveForm({
  facility,
  reserves,
  loading,
  onClickPrev,
  onSubmit,
}: AddReserveFormProps) {
  const [reserveType, setReserveType] = useState<'always' | 'period' | 'day'>('day');

  const [start, setStart] = useState<Date>(parse('08:00', formatHHMM, new Date()));
  const [end, setEnd] = useState<Date>(parse('17:00', formatHHMM, new Date()));

  const setRange = useCallback((start: string, end: string) => {
    setStart(parse(start, formatHHMM, new Date()));
    setEnd(parse(end, formatHHMM, new Date()));
  }, []);

  const handleSubmitForm = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      if (!facility || !start) return toast.error('예약 시간이 잘못되었습니다');
      const always = reserveType === 'always';
      if (!always && end && start.getTime() >= end.getTime())
        return toast.error('예약 시간이 잘못되었습니다');

      return onSubmit?.({
        start,
        end,
        always,
        facilityId: facility.id,
      });
    },
    [end, facility, onSubmit, reserveType, start],
  );

  return (
    <>
      <ReserveDrawerHeader reserves={reserves || []} title={`${facility?.name || '...'} 예약`}>
        <Toggle.Root
          className="m-auto mr-0"
          value={reserveType}
          onChange={(v) => setReserveType(v as typeof reserveType)}
        >
          <Toggle.Item value="day">종일</Toggle.Item>
          <Toggle.Item value="period">시간차</Toggle.Item>
          <Toggle.Item value="always">고정석</Toggle.Item>
        </Toggle.Root>
      </ReserveDrawerHeader>

      <form data-vaul-no-drag={true} onSubmit={handleSubmitForm}>
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
                value={format(start, formatHHMM)}
                onChangeTime={(v) => {
                  setStart(parse(v, formatHHMM, new Date()));
                }}
              />
              <span className="text-sm">부터</span>
              <TimePicker
                className="text-lg"
                disabled={reserveType === 'always'}
                value={format(end, formatHHMM)}
                onChangeTime={(v) => setEnd(parse(v, formatHHMM, new Date()))}
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
              onClickPrev?.();
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
