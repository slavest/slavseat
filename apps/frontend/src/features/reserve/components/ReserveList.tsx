import React from 'react';

import { Model } from '@slavseat/types';
import { Drawer } from 'vaul';

import { cn } from '@/shared/utils/class.util';

import { getHHMM, getYYYYMMDD } from '../utils/reserve.util';

interface ReserveListItemProps {
  reserve: Model.ReserveInfo;
  onClickItem?: (reserve: Model.ReserveInfo) => void;
}

function ReserveListItem({
  reserve,
  onClickItem,
}: ReserveListItemProps) {
  const { facility, always, start, end } = reserve;

  return (
    <Drawer.Trigger asChild>
      <li
        className={cn(
          'w-full h-12 flex items-center justify-between px-4',
          'text-xs font-semibold',
          'bg-white',
          'first:rounded-t-md last:rounded-b-md',
        )}
        onClick={() => onClickItem?.(reserve)}
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
    </Drawer.Trigger>
  );
}

interface ReserveListProps {
  title?: string;
  reserves: Model.ReserveInfo[];
  onClickItem?: (reserve: Model.ReserveInfo) => void;
}

export function ReserveList({
  title,
  reserves,
  onClickItem,
}: ReserveListProps) {
  return (
    <div>
      <span className="text-xs text-gray-500 font-semibold px-1">
        {title}
      </span>
      <ul className="border rounded-md">
        {reserves.map((reserve) => (
          <ReserveListItem
            key={reserve.id}
            reserve={reserve}
            onClickItem={onClickItem}
          />
        ))}
      </ul>
    </div>
  );
}
