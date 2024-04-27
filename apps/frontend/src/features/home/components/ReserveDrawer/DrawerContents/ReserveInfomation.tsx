import React from 'react';

import { Model } from '@slavseat/types';

import { Button } from '@/shared/components/Button';
import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

import { ReserveDrawerHeader } from '../Header';

interface ReserveInfomationProps {
  facility?: Model.FacilitySummary;
  reserves?: Model.ReserveInfo[];
  onClickOk?: () => void;
}

export function ReserveInfomation({ facility, reserves, onClickOk }: ReserveInfomationProps) {
  return (
    <>
      <ReserveDrawerHeader
        reserves={reserves || []}
        title={`${facility?.name || '...'} 예약 현황`}
      />
      {/* info 스텝일때 표시할 내용 */}

      <div className="my-4 space-y-2" data-vaul-no-drag={true}>
        {/* 현재 좌석에 대한 예약들 표시 */}
        {reserves?.map((reserve) => (
          <div
            key={reserve.id}
            className={cn(
              'flex justify-between rounded-[10px] border border-neutral-150 px-6 py-3.5 text-sm font-medium shadow-blur-sm',
              {
                'opacity-50': reserve.end && new Date(reserve.end) <= new Date() && !reserve.always,
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

      <Button className="mt-8" size="full" variant="secondary" onClick={onClickOk}>
        예약 하기
      </Button>
    </>
  );
}
