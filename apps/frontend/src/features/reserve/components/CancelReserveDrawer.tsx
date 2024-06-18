import React from 'react';

import { Model } from '@slavseat/types';

import { Button } from '@/shared/components/Button';
import { Drawer } from '@/shared/components/Drawer';
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
    <Drawer.Root open={!!targetReserve} onOpen={(open) => open === false && onClose?.()}>
      <Drawer.Popover>
        <Drawer.Backdrop />
        <Drawer.Body>
          <Drawer.DragBar />

          <div className={cn('h-full w-full', 'flex flex-col', 'mb-8')}>
            {targetReserve ? (
              <div className="flex flex-col gap-y-8">
                <div className="flex flex-col items-start gap-y-2">
                  <h4 className="text-xl font-bold">{getSeatName(targetReserve)}</h4>

                  <div>
                    <p className="text-lg font-semibold">{getYYYYMMDD(targetReserve.start)}</p>

                    <p>
                      {targetReserve.always
                        ? `고정 좌석`
                        : `${getHHMM(
                            targetReserve.start,
                            (hh, mm) => `${hh}시 ${mm}분`,
                          )} ~ ${getHHMM(targetReserve.end, (hh, mm) => `${hh}시 ${mm}분`)}`}
                    </p>
                  </div>
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
        </Drawer.Body>
      </Drawer.Popover>
    </Drawer.Root>
  );
}
