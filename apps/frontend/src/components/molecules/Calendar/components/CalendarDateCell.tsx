import React, { PropsWithChildren, useMemo } from 'react';

import { CalendarDate, useCalendarContext } from '../context';

const isSameDate = (date: CalendarDate, targetDate: CalendarDate) => {
  const ymd = date.toISOString().split('T')[0];
  const targetYmd = targetDate.toISOString().split('T')[0];
  return ymd === targetYmd;
};

interface CalendarDateCellProps extends PropsWithChildren {
  date: CalendarDate;
}
const CalendarDateCell = ({
  children,
  date,
}: CalendarDateCellProps) => {
  const { handleSelectDate, selectedDate, mode } =
    useCalendarContext();

  const handleClickDateCell = () => {
    handleSelectDate?.(date);
  };
  const isSelected = useMemo(
    () => isSameDate(date, selectedDate || new Date()),
    [date, selectedDate],
  );
  const isNotCurrentMonth = useMemo(
    () =>
      mode === 'days' && date.getMonth() !== selectedDate?.getMonth(),
    [mode, selectedDate, date],
  );
  const baseCls = `w-[calc(100% / 7)] h-[50px] leading-[50px]`;
  const basicCls = `${baseCls} bg-gray-50`;
  const selectedCls = `${baseCls} bg-black text-white`;
  const notCurrentMonthCls = `${baseCls} bg-gray-50 text-gray-300`;

  const getDateCls = () => {
    if (isSelected) return selectedCls;
    if (isNotCurrentMonth) return notCurrentMonthCls;
    return basicCls;
  };

  return (
    <div className={getDateCls()} onClick={handleClickDateCell}>
      {children}
    </div>
  );
};
export default CalendarDateCell;
