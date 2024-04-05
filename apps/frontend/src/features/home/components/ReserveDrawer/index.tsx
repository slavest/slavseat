import React, { useCallback, useMemo, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';
import { parse } from 'date-fns';

import { Badge, Status } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { Drawer } from '@/shared/components/Drawer';
import { Loading } from '@/shared/components/Loading';
import { TimePicker } from '@/shared/components/TimePicker';
import { Toggle } from '@/shared/components/Toggle';
import { formatHHMM } from '@/shared/constants/date.constant';
import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

const isCurrentReserve = (reserve: Model.ReserveInfo) =>
  new Date(reserve.start).getTime() <= Date.now() &&
  (reserve.always ||
    reserve.end === undefined ||
    (reserve.end && new Date(reserve.end).getTime() >= Date.now()));

export interface ReserveData {
  start: Date;
  end?: Date;
  always: boolean;
  facilityId: number;
}

interface ReserveDrawerProps {
  open: boolean;
  reserves?: Model.ReserveInfo[];
  facility?: Model.FacilitySummary;
  loading?: boolean;
  onClose?: () => void;
  onSubmit?: (data: ReserveData) => void;
}

export function ReserveDrawer({
  open,
  reserves,
  facility,
  loading,
  onClose,
  onSubmit,
}: ReserveDrawerProps) {
  const [step, setStep] = useState<'info' | 'reserve'>('info');
  const [reserveType, setReserveType] = useState<'always' | 'period'>(
    'period',
  );

  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();

  const handleSubmitForm = useCallback<
    React.FormEventHandler<HTMLFormElement>
  >(
    (e) => {
      e.preventDefault();
      if (!facility || !start)
        return toast.error('예약 시간이 잘못되었습니다');
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

  const handleClose = useCallback(() => {
    setStep('info');
    setReserveType('period');
    setStart(undefined);
    setEnd(undefined);
    onClose?.();
  }, [onClose]);

  const currentReserve = useMemo(() => {
    const current = reserves?.filter(isCurrentReserve).at(0);

    return current;
  }, [reserves]);

  const isFutureReserved = useMemo(
    () =>
      Boolean(
        reserves?.filter(
          (reserve) =>
            new Date(reserve.start).getTime() >= Date.now(),
        ).length,
      ),
    [reserves],
  );

  return (
    <Drawer open={open} onClose={handleClose}>
      <div data-vaul-no-drag={true}>
        {/* 현재 보는 좌석의 Status 표시 */}
        <Badge
          status={
            currentReserve
              ? Status.USING
              : isFutureReserved
                ? Status.RESERVED
                : Status.ABLE_RESERVE
          }
        />
        <div className="flex justify-between items-center text-2xl font-medium">
          <span>
            {facility?.name}
            {/* 현재 step에 따라 다른 텍스트 표시 */}
            {step === 'info' && ' 예약 현황'}
            {step === 'reserve' && ' 예약'}
          </span>
          {/* 예약 유형 변경 토글 */}
          {step === 'reserve' && (
            <Toggle.Root
              className="m-auto mr-0"
              value={reserveType}
              onChange={(v) =>
                setReserveType(v as typeof reserveType)
              }
            >
              <Toggle.Item value="period">시간차</Toggle.Item>
              <Toggle.Item value="always">고정석</Toggle.Item>
            </Toggle.Root>
          )}
        </div>
        <div className="text-sm font-medium text-neutral-400">
          {/* 지금 시간을 기준으로 예약이 있는지 표시 */}
          {currentReserve
            ? `${currentReserve.user.name} 님이 현재 사용중입니다.`
            : '사용중이지 않은 좌석입니다.'}
        </div>
      </div>

      {/* info 스텝일때 표시할 내용 */}
      {step === 'info' && (
        <>
          <div className="my-4 space-y-2" data-vaul-no-drag={true}>
            {/* 현재 좌석에 대한 예약들 표시 */}
            {reserves?.map((reserve) => (
              <div
                key={reserve.id}
                className={cn(
                  'flex justify-between px-6 py-3.5 border border-neutral-150 rounded-[10px] shadow-blur-sm text-sm font-medium',
                  {
                    'opacity-50':
                      reserve.end &&
                      new Date(reserve.end) <= new Date() &&
                      !reserve.always,
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
            variant="secondary"
            size="full"
            className="mt-8"
            onClick={() => setStep('reserve')}
          >
            예약 하기
          </Button>
        </>
      )}

      {/* reserve 스텝일때 표시할 내용 */}
      {step === 'reserve' && (
        <form onSubmit={handleSubmitForm} data-vaul-no-drag={true}>
          <div
            className="flex my-10 gap-4 items-center justify-center"
            data-vaul-no-drag={true}
          >
            <TimePicker
              className="text-lg"
              onChangeTime={(v) =>
                setStart(parse(v, formatHHMM, new Date()))
              }
            />
            <span className="text-sm">부터</span>
            <TimePicker
              className="text-lg"
              onChangeTime={(v) =>
                setEnd(parse(v, formatHHMM, new Date()))
              }
              disabled={reserveType === 'always'}
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="w-12 flex justify-center items-center"
              onClick={(e) => {
                e.preventDefault();
                setStep('info');
              }}
            >
              {/* 예약 현황 */}
              <IoMdArrowRoundBack />
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="flex-1 text-sm"
              disabled={loading}
            >
              {loading ? <Loading /> : '좌석 예약'}
            </Button>
          </div>
        </form>
      )}
    </Drawer>
  );
}
