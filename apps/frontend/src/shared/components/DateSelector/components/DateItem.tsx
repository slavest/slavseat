import React from 'react';

import { cn } from '@/shared/utils/class.util';

const DayString = ['일', '월', '화', '수', '목', '금', '토'];

interface DateItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export function DateItem({
  date,
  selectable = true,
  selected = false,
  disabled = false,
  className,
  onClick,
  ...rest
}: DateItemProps) {
  const day = date.getDay();

  return (
    <div
      className={cn(
        'flex h-10 w-10 flex-col items-center justify-center rounded-[10px] text-center',
        'cursor-pointer',
        {
          'opacity-50': disabled,
          'text-red-500': day === 0 || day === 6,
          [cn('text-white', selectable ? 'bg-primary' : 'bg-gray-600')]: selected,
        },
        className,
      )}
      onClick={(e) => !disabled && onClick?.(e)}
      {...rest}
    >
      <div
        className={cn('text-[0.5rem] font-normal text-neutral-400', {
          'text-red-500': day === 0 || day === 6,
          'text-white': selected,
        })}
      >
        {DayString[day]}
      </div>
      <div className={cn('text-sm font-medium', selectable && 'font-semibold')}>
        {date.getDate()}
      </div>
    </div>
  );
}
