import React from 'react';

import { ClassNameValue, twMerge } from 'tailwind-merge';

export enum Status {
  USING = 'USING',
  ABLE_RESERVE = 'ABLE_RESERVE',
}

interface BadgeProps {
  status: Status;
}

const badgeStyle: { [key in Status]: ClassNameValue } = {
  [Status.USING]: 'bg-red-600',
  [Status.ABLE_RESERVE]: 'bg-primary',
};

const badgeText = {
  [Status.USING]: '사용중',
  [Status.ABLE_RESERVE]: '예약가능',
};

export function Badge({ status }: BadgeProps) {
  return (
    <div
      className={twMerge(
        'inline-block text-xs font-light rounded-2xl px-2.5 py-1 text-white',
        badgeStyle[status],
      )}
    >
      {badgeText[status]}
    </div>
  );
}
