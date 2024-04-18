import React from 'react';

import { ClassNameValue } from 'tailwind-merge';

import { cn } from '@/shared/utils/class.util';

// eslint-disable-next-line react-refresh/only-export-components
export enum Status {
  USING = 'USING',
  ABLE_RESERVE = 'ABLE_RESERVE',
  RESERVED = 'RESERVED',
  ALWAYS = 'ALWAYS',
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status;
}

const badgeStyle: { [key in Status]: ClassNameValue } = {
  [Status.USING]: 'bg-red-600',
  [Status.ABLE_RESERVE]: 'bg-primary',
  [Status.RESERVED]: 'bg-orange-600',
  [Status.ALWAYS]: 'bg-blue-600',
};

const badgeText = {
  [Status.USING]: '사용중',
  [Status.ABLE_RESERVE]: '예약가능',
  [Status.RESERVED]: '에약됨',
  [Status.ALWAYS]: '고정석',
};

export function Badge({
  status,
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-block text-xs font-base rounded-2xl px-2.5 py-1 text-white',
        badgeStyle[status],
        className,
      )}
      {...rest}
    >
      {children || badgeText[status]}
    </div>
  );
}
