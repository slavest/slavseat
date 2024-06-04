import React from 'react';

import { Model } from '@slavseat/types';

import { Button } from '@/shared/components/Button';
import { DrawerLegacy } from '@/shared/components/Drawer_legacy';
import { Loading } from '@/shared/components/Loading';
import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

import { getSeatName, getYYYYMMDD } from '../utils/reserve.util';

interface CancelReserveDrawerProps {
  targetReserve: Model.ReserveInfo | null;
  loading?: boolean;
  onClose: () => void;
  onClickCancel: (reserve: Model.ReserveInfo) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export function CancelReserveDrawer({
  targetReserve,
  loading,
  onClose,
  onClickCancel,
}: CancelReserveDrawerProps) {
  return (
    <DrawerLegacy open={!!targetReserve} onClose={onClose}>
      <div className={cn('h-full w-full', 'flex flex-col')}>
        {targetReserve ? (
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between gap-x-2">
              <div>
                <p className="text-xl font-semibold">{getYYYYMMDD(targetReserve.start)}</p>

                <p>
                  {targetReserve.always
                    ? `고정 좌석`
                    : `${getHHMM(targetReserve.start, (hh, mm) => `${hh}시 ${mm}분`)} ~ ${getHHMM(
                        targetReserve.end,
                        (hh, mm) => `${hh}시 ${mm}분`,
                      )}`}
                </p>
              </div>

              <h4 className="text-xl font-semibold">{getSeatName(targetReserve)}</h4>
            </div>

            <Button
              className="w-full"
              disabled={loading}
              variant="secondary"
              onClick={() => onClickCancel(targetReserve)}
            >
              {loading ? <Loading /> : '예약 취소 하기'}
            </Button>
          </div>
        ) : null}
      </div>
    </DrawerLegacy>
  );
}
