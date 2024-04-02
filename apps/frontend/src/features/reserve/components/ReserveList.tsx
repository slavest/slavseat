import React from 'react';

import { Model } from '@slavseat/types';

import { cn } from '@/shared/utils/class.util';

import { getHHMM, getYYYYMMDD } from '../utils/reserve.util';

interface ReserveListItemProps {
  reserve: Model.ReserveInfo;
}

function ReserveListItem({ reserve }: ReserveListItemProps) {
  const { facility, always, start, end } = reserve;

  return (
    <li
      className={cn(
        'w-full h-12 flex items-center justify-between px-4',
        'text-xs font-medium',
        'bg-white',
        'first:rounded-t-lg last:rounded-b-lg',
      )}
    >
      <span>
        {facility.floor.name}-{facility.name}
      </span>

      <span>
        {always
          ? `${getYYYYMMDD(start)} ${getHHMM(start)}`
          : `${getHHMM(start)} - ${getHHMM(end)}`}
      </span>
    </li>
  );
}

interface ReserveListProps {
  title?: string;
  reserves: Model.ReserveInfo[];
}

export function ReserveList({ title, reserves }: ReserveListProps) {
  return (
    <div className="space-y-1">
      <span className="text-xs text-gray-500 px-1 font-medium">
        {title}
      </span>
      <ul className="rounded-lg shadow-blur-sm">
        {reserves.map((reserve) => (
          <ReserveListItem key={reserve.id} reserve={reserve} />
        ))}
      </ul>
    </div>
  );
}
