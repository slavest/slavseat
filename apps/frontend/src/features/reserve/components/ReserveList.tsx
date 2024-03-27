import React from 'react';

import { Model } from '@slavseat/types';

import { cn } from '@/shared/utils/class.util';

import { getHHMM } from '../utils/reserve.util';

interface ReserveListItemProps {
  reserve: Model.ReserveInfo;
}

function ReserveListItem({ reserve }: ReserveListItemProps) {
  const { facility, always, start, end } = reserve;
  return (
    <li
      className={cn(
        'w-full h-12 flex items-center justify-between px-4',
        'text-xs font-semibold',
        'bg-white',
        'first:rounded-t-md last:rounded-b-md',
      )}
    >
      <span>
        {facility.floor.name}-{facility.name}
      </span>

      <span>
        {getHHMM(start)} - {!always ? getHHMM(end) : null}
      </span>
    </li>
  );
}

interface ReserveListProps {
  reserves: Model.ReserveInfo[];
}

export function ReserveList({ reserves }: ReserveListProps) {
  return (
    <ul className="border rounded-md">
      {reserves.map((reserve) => (
        <ReserveListItem key={reserve.id} reserve={reserve} />
      ))}
    </ul>
  );
}
