import React, { useCallback, useMemo, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { getWeek } from 'date-fns';

import { useControlled } from '@/shared/hooks/useControlled';
import { cn } from '@/shared/utils/class.util';

import { DateItem } from './components/DateItem';
import { getStartOfWeek } from './utils/date';

interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected?: Date;
  onSelect?: (date: Date) => void;
}

export function DateSelector({
  className,
  selected: selectedProps,
  onSelect,
  ...rest
}: DatePickerProps) {
  const [selected, setSelected] = useControlled(new Date(), selectedProps);
  const [week, setWeek] = useState(getWeek(new Date()));

  const handleClickDate = useCallback(
    (date: Date) => {
      setSelected(date);
      onSelect?.(date);
    },
    [onSelect, setSelected],
  );

  const dates = useMemo(() => {
    const startDate = new Date(getStartOfWeek(week).getTime() - 86400000);

    return [
      startDate,
      ...new Array(6).fill(0).reduce((acc, _, i) => {
        return [...acc, new Date(getStartOfWeek(week).getTime() + 86400000 * i)];
      }, []),
    ] as Date[];
  }, [week]);

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-2xl bg-neutral-100 px-2 py-2',
        className,
      )}
      {...rest}
    >
      <HiChevronLeft onClick={() => setWeek((prev) => prev - 1)} />
      <div className="flex">
        {dates.map((date) => (
          <DateItem
            key={date.getTime()}
            date={date}
            disabled={!isSameDate(date, new Date()) && Date.now() >= date.getTime()}
            selected={isSameDate(date, selected)}
            onClick={() => handleClickDate(date)}
          />
        ))}
      </div>
      <HiChevronRight onClick={() => setWeek((prev) => prev + 1)} />
    </div>
  );
}
