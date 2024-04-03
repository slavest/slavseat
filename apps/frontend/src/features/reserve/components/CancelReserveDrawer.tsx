import React, { PropsWithChildren } from 'react';

import { Model } from '@slavseat/types';
import { Drawer } from 'vaul';

import { Button } from '@/shared/components/Button';
import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

import { getYYYYMMDD } from '../utils/reserve.util';

interface CancelReserveDrawerProps {
  targetReserve: Model.ReserveInfo | null;
  onClickCancel: (reserve: Model.ReserveInfo) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
function CancelReserveDrawerContent({
  targetReserve,
  onClickCancel,
}: CancelReserveDrawerProps) {
  return (
    <Drawer.Portal>
      <Drawer.Content className="max-w-[50rem] mx-auto fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-2xl bg-white shadow-blur outline-none p-8">
        <div className={cn('w-full h-full', 'flex flex-col')}>
          {targetReserve ? (
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center justify-between gap-x-2">
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

              <Button
                variant="secondary"
                className="w-full"
                onMouseDown={() => onClickCancel(targetReserve)}
              >
                예약 취소 하기
              </Button>
            </div>
          ) : null}
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function CancelReserveDrawerRoot({ children }: PropsWithChildren) {
  return <Drawer.Root>{children}</Drawer.Root>;
}

export const CancelReserveDrawer = {
  Root: CancelReserveDrawerRoot,
  Content: CancelReserveDrawerContent,
};
