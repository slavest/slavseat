import React from 'react';

import clsx from 'clsx';

import { Badge, Status } from '@/shared/components/Badge';

export function Seat() {
  return (
    // TODO: FacilityGridViewer 랑 모시갱이할 것.
    <article
      className={clsx(
        'min-w-24 w-24 min-h-24 h-24',
        'flex flex-col items-center justify-center gap-y-2',
        'shadow rounded-md bg-white border border-neutral-100',
      )}
    >
      <h3 className="font-semibold">72번 좌석</h3>
      <Badge status={Status.ABLE_RESERVE} />
    </article>
  );
}
