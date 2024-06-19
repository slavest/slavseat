import React, { ComponentProps } from 'react';

import { Model } from '@slavseat/types';

import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

import { checkUsing, getYYYYMMDD } from '../utils/reserve.util';

export function ReserveListItem({ children, className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      className={cn(
        'flex h-12 w-full items-center justify-between px-4',
        'text-xs font-medium',
        'cursor-pointer bg-white',
        'first:rounded-t-lg last:rounded-b-lg',
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

interface ReserveListProps {
  title?: string;
  reserves: Model.ReserveInfo[];
  onClickItem?: (reserve: Model.ReserveInfo) => void;
}

export function ReserveList({ title, reserves, onClickItem }: ReserveListProps) {
  return (
    <div className="space-y-1">
      {title ? <span className="px-1 text-xs font-medium text-gray-500">{title}</span> : null}

      <ul className="select-none rounded-lg shadow-blur-sm">
        {reserves.map((reserve) => {
          const { facility, always, start, end } = reserve;

          const using = checkUsing(reserve);

          return (
            <ReserveListItem key={reserve.id} onClick={() => onClickItem?.(reserve)}>
              <p>
                {facility.floor.name}-{facility.name}
                {using ? <span className="ml-1 text-xs text-red-500">사용중</span> : null}
              </p>

              <span>
                {always
                  ? `${getYYYYMMDD(start)} ${getHHMM(start)}`
                  : `${getHHMM(start)} - ${getHHMM(end)}`}
              </span>
            </ReserveListItem>
          );
        })}
      </ul>
    </div>
  );
}
