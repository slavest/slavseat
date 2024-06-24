import React from 'react';

import { Model } from '@slavseat/types';

import { getYYYYMMDD } from '@/features_legacy/reserve/utils/reserve.util';
import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

interface ReserveListItemProps {
  reserve: Model.ReserveInfo;
  onClickItem?: (reserve: Model.ReserveInfo) => void;
}

function ReserveListItem({ reserve, onClickItem }: ReserveListItemProps) {
  const { facility, always, start, end } = reserve;

  return (
    <li
      className={cn(
        'flex h-12 w-full items-center justify-between px-4',
        'text-xs font-medium',
        'bg-white',
        'first:rounded-t-lg last:rounded-b-lg',
      )}
      onClick={() => onClickItem?.(reserve)}
    >
      <span>
        {facility.floor.name}-{facility.name}
      </span>

      <span>
        {always ? `${getYYYYMMDD(start)} ${getHHMM(start)}` : `${getHHMM(start)} - ${getHHMM(end)}`}
      </span>
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
      <span className="px-1 text-xs font-medium text-gray-500">{title}</span>
      <ul className="rounded-lg shadow-blur-sm">
        {reserves.map((reserve) => (
          <ReserveListItem key={reserve.id} reserve={reserve} onClickItem={onClickItem} />
        ))}
      </ul>
    </div>
  );
}
