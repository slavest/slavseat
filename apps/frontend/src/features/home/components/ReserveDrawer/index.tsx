import React, { useCallback, useMemo, useState } from 'react';

import { Model } from '@slavseat/types';
import { parse } from 'date-fns';
import { Drawer } from 'vaul';

import { Badge, Status } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { Toggle } from '@/shared/components/Toggle';
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
  onClose?: () => void;
  onSubmit?: (data: ReserveData) => void;
}

export function ReserveDrawer({
  open,
  reserves,
  facility,
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
      if (!facility || !start) return;

      onSubmit?.({
        start,
        end,
        always: reserveType === 'always',
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
    <Drawer.Root open={open} onClose={handleClose}>
      <Drawer.Portal>
        <Drawer.Content className="max-w-[50rem] mx-auto fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-2xl bg-white shadow-blur outline-none">
          <div className="p-8">
            <div>
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
                <div className="my-4 space-y-2">
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
                            {reserve.end &&
                              getHHMM(new Date(reserve.end))}
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
                  예약 화면으로
                </Button>
              </>
            )}

            {/* reserve 스텝일때 표시할 내용 */}
            {step === 'reserve' && (
              <form onSubmit={handleSubmitForm}>
                <div className="flex my-10 gap-2 items-center justify-center">
                  <input
                    type="time"
                    className="px-2 border-2 rounded-md border-neutral-200"
                    onChange={(e) =>
                      setStart(
                        parse(e.target.value, 'HH:mm', new Date()),
                      )
                    }
                    required
                  />
                  <span className="text-sm">부터</span>
                  <input
                    type="time"
                    className={cn(
                      'px-2 border-2 rounded-md border-neutral-200',
                      { 'opacity-50': reserveType === 'always' },
                    )}
                    onChange={(e) =>
                      setEnd(
                        parse(e.target.value, 'HH:mm', new Date()),
                      )
                    }
                    disabled={reserveType === 'always'}
                    required={reserveType === 'period'}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setStep('info');
                    }}
                  >
                    예약 현황
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="flex-1 text-sm"
                  >
                    좌석 예약
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
