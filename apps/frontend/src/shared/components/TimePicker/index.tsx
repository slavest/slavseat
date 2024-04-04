import React, { useCallback } from 'react';

import { format, parse } from 'date-fns';

import { formatHHMM } from '@/shared/constants/date.constant';
import { useControlled } from '@/shared/hooks/useControlled';
import { cn } from '@/shared/utils/class.util';

import { TimeSlider } from './components/TimeSlider';

interface TimePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  value?: string;
  onChangeHour?: (hour: number) => void;
  onChangeMinute?: (minute: number) => void;
  onChangeTime?: (time: string) => void;
}

export function TimePicker({
  value,
  disabled,
  className,
  onChangeHour,
  onChangeMinute,
  onChangeTime,
  ...rest
}: TimePickerProps) {
  const [time, setTime] = useControlled('00:00', value);

  const handleChangeHour = useCallback(
    (value: number) => {
      const date = parse(time, formatHHMM, new Date());
      date.setHours(value);
      const dateString = format(date, formatHHMM);

      setTime(dateString);
      onChangeHour?.(value);
      onChangeTime?.(dateString);
    },
    [onChangeHour, onChangeTime, setTime, time],
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const date = parse(time, formatHHMM, new Date());
      date.setMinutes(value);
      const dateString = format(date, formatHHMM);

      setTime(dateString);
      onChangeMinute?.(value);
      onChangeTime?.(dateString);
    },
    [onChangeMinute, onChangeTime, setTime, time],
  );

  return (
    <div
      data-vaul-no-drag={true}
      className={cn(
        'flex gap-2 items-center',
        { 'opacity-50 touch-none': disabled },
        className,
      )}
      {...rest}
    >
      <TimeSlider
        slideCount={24}
        value={parse(time, formatHHMM, new Date()).getHours()}
        onChange={handleChangeHour}
        disabled={disabled}
      />
      <span>:</span>
      <TimeSlider
        slideCount={60}
        value={parse(time, formatHHMM, new Date()).getMinutes()}
        onChange={handleChangeMinute}
        disabled={disabled}
      />
    </div>
  );
}
