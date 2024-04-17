import React from 'react';

import { Model } from '@slavseat/types';

import { Button } from '@/shared/components/Button';
import { Drawer } from '@/shared/components/LegacyDrawer';
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
    <Drawer open={!!targetReserve} onClose={onClose}>
      <div className={cn('w-full h-full', 'flex flex-col')}>
        {targetReserve ? (
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between gap-x-2">
              <div>
                <p className="text-xl font-semibold">
                  {getYYYYMMDD(targetReserve.start)}
                </p>

                <p>
                  {targetReserve.always
                    ? `고정 좌석`
                    : `${getHHMM(
                        targetReserve.start,
                        (hh, mm) => `${hh}시 ${mm}분`,
                      )} ~ ${getHHMM(
                        targetReserve.end,
                        (hh, mm) => `${hh}시 ${mm}분`,
                      )}`}
                </p>
              </div>

              <h4 className="text-xl font-semibold">
                {getSeatName(targetReserve)}
              </h4>
            </div>

            <Button
              variant="secondary"
              className="w-full"
              disabled={loading}
              onClick={() => onClickCancel(targetReserve)}
            >
              {loading ? <Loading /> : '예약 취소 하기'}
            </Button>
          </div>
        ) : null}
      </div>
    </Drawer>
  );
}
