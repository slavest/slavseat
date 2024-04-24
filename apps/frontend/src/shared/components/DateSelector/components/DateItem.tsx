import React from 'react';

import { cn } from '@/shared/utils/class.util';

const DayString = ['일', '월', '화', '수', '목', '금', '토'];

interface DateItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  selected?: boolean;
  disabled?: boolean;
}

export function DateItem({
  date,
  selected = false,
  disabled = false,
  className,
  onClick,
  ...rest
}: DateItemProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 flex-col items-center justify-center rounded-[10px] text-center',
        {
          'bg-primary text-white': selected,
          'opacity-50': disabled,
        },
        className,
      )}
      onClick={(e) => !disabled && onClick?.(e)}
      {...rest}
    >
      <div
        className={cn('text-[0.5rem] font-normal text-neutral-400', {
          'text-white': selected,
        })}
      >
        {DayString[date.getDay()]}
      </div>
      <div className="text-sm font-medium">{date.getDate()}</div>
    </div>
  );
}
